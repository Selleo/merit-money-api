if (process.env.NODE_ENV !== 'production') require('dotenv').config()

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import basicAuth from 'express-basic-auth';

import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import auth0Client from './auth0Client';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}.auth0.com/.well-known/jwks.json`
  }),

  aud: `https://${process.env.AUTH0_DOMAIN}.auth0.com/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}.auth0.com/`,
  algorithms: ['RS256'],
});


const app = express();
app.use(cors());
const __dirname = path.resolve();

mongoose.connect(process.env.MONGO_URL, {useMongoClient: true});
const db = mongoose.connection;
import User from './mongoose/user';
import Organization from './mongoose/organization';
import UserOrganization from './mongoose/userOrganization';
import Kudo from './mongoose/kudo';

db.on('error', ()=> {
  console.log( '---FAILED to connect to mongoose');
});
db.once('open', () => {
  console.log( '+++Connected to mongoose');
});

app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));

app.listen((process.env.PORT || 3000),()=> {
  console.log('+++Express Server is Running!!!');
});
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
});

const checkIfUserExists = (req, res, next) => {
  User.findOne({ 'user_id': req.user.sub }, (err, user) => {
    if(err) {
      console.log(err);
    }
    if(!user) {
      User.create({ ...req.user, user_id: req.user.sub }, (err, user) => {
        if(err) {
          console.log(err);
        }
        console.log('new', user);
      });
    }
  });

  next();
};

app.use('/graphql', checkJwt, checkIfUserExists, graphqlHTTP(req => ({
  schema
  // ,graphiql:true
})));

app.use('/superql', basicAuth({users: {'admin': process.env.BASIC_AUTH_PASS}, challenge: true, realm: 'Imb4T3st4pp'}), graphqlHTTP(req => ({
  schema,
  graphiql:true
})));
