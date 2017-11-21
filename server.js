import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import graphqlHTTP from 'express-graphql';

import Organization from './mongoose/organization';

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

app.use('/graphql', checkJwt, graphqlHTTP(req => ({
  schema
  //,graphiql:true
})));

app.get('/users', checkJwt, (req, res)=>{
  auth0Client.management.getUsers(function (err, users) {
    if (err) {
      console.log(err);
    }
    console.log('tonie');
    res.send(users);
  });
});

// const checkIfUserExists = (req, res, next) => {
//   console.log('mamo');
//   console.log('Requests', req.user.sub);
//   console.log('----------------------');
//   next();
// };

app.get('/user/me', checkJwt, (req, res)=>{
  console.log('user', req.user);
  auth0Client.management.getUser({id: req.user.sub}, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
});