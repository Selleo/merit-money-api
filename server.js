if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';
import auth0Client from './auth0Client';
import User from './models/user';
import Organization from './models/organization';
import UserOrganization from './models/userOrganization';
import Kudo from './models/kudo';

import { toCamelCase } from '@travelperksl/case-converter'

const app = express();
mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });

app.use(cors());

const __dirname = path.resolve();
const db = mongoose.connection;

db.on('error', () => {
  console.log('---FAILED to connect to mongoose');
});
db.once('open', () => {
  console.log('+++Connected to mongoose');
});

app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));

app.listen((process.env.PORT || 3000), () => {
  console.log('+++Express Server is Running!!!');
});

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

const checkIfUserExists = (req, res, next) => {
  User.findOne({ user_id : req.user.sub }, (err, user) => {
    if (err) { console.log(err) }
    if (!user) {
      const userData =  toCamelCase(req.user)
      User.create({ ...userData, userId: req.user.sub }, (err, user) => {
        if (err) { console.log(err) }
        next();
      });
    } else {
      req.fullUser = user;
      next();
    }
  });
};

const setupFirstUserAsCurrent = (req, res, next) => {
  User.findOne({}, (err, user) => {
    if (err) { console.log(err) }
    req.fullUser = user;
    next();
  });
};

const checkJwt = jwt({
  algorithms: ['RS256'],
  aud: `https://${process.env.AUTH0_DOMAIN}.auth0.com/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}.auth0.com/`,
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}.auth0.com/.well-known/jwks.json`
  }),
});

app.use('/graphql',
  checkJwt,
  checkIfUserExists,
  graphqlHTTP(req => ({
    schema,
    context: req.fullUser,
  }))
);

app.use('/graphiql',
  setupFirstUserAsCurrent,
  basicAuth({users: {'admin': process.env.BASIC_AUTH_PASS}, challenge: true, realm: 'Imb4T3st4pp'}),
  graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: req.fullUser,
  }))
)
