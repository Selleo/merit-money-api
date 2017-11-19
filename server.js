import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
var app = express();

import Organization from './mongoose/organization'

mongoose.connect('mongodb://localhost:27017/local', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', ()=> {
  console.log( '---FAILED to connect to mongoose');
});
db.once('open', () => {
 console.log( '+++Connected to mongoose')
});
// start the server
app.listen(3000,()=> {
  console.log('+++Express Server is Running!!!');
});
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
});

app.post('/oranizations',(req,res)=>{
  var organization = new Organization({
   organizationId:1,
   name:req.body.name,
  })
  organization.save((err,result)=> {
   if (err) {console.log("---TodoItem save failed " + err)}
   console.log("+++TodoItem saved successfully "+todoItem.item)
  res.redirect('/')
  })
 })