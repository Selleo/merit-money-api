import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import graphqlHTTP from 'express-graphql';

import Organization from './mongoose/organization';
import User from './mongoose/user';

import schema from './graphql/schema';

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import auth0Client from './auth0Client';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://merit-money.auth0.com/.well-known/jwks.json'
  }),

  aud: 'https://merit-money.auth0.com/api/v2/',
  issuer: 'https://merit-money.auth0.com/',
  algorithms: ['RS256'],
});


var app = express();
var __dirname = path.resolve();

mongoose.connect('mongodb://localhost:27017/local', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', ()=> {
  console.log( '---FAILED to connect to mongoose');
});
db.once('open', () => {
  console.log( '+++Connected to mongoose');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000,()=> {
  console.log('+++Express Server is Running!!!');
});
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.post('/oranizations', (req,res)=>{
  console.log(req.body);
  var organization = new Organization({
    organizationId: 1,
    name: req.body.name,
  });
  organization.save((err, result)=> {
    if (err) {
      console.log('---TodoItem save failed ' + err);
    }
    console.log(result);
    console.log('+++TodoItem saved successfully ' + result.name);
    res.redirect('/');
  });
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
  //,graphiql:true
})));

app.get('/users', checkJwt, checkIfUserExists, (req, res)=>{
  auth0Client.management.getUsers(function (err, users) {
    if (err) {
      console.log(err);
    }
    res.send(users);
  });
});

app.get('/user/me', checkJwt, checkIfUserExists, (req, res)=>{
  auth0Client.management.getUser({id: req.user.sub}, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
});