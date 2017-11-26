if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

import './models';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';

import { checkJwt } from './middlewares/auth';
import { checkIfUserExists, setupFirstUserAsCurrent } from './middlewares/currentUser';

import { setupDatabase } from './database';

setupDatabase();

const app = express();

app.use(cors());
app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));
app.get('/', (req,res) => {
  const __dirname = path.resolve();
  res.sendFile(__dirname + '/index.html');
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
);
app.listen((process.env.PORT || 3000), () => {
  console.log('+++Express Server is Running!!!');
});
