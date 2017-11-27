if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

import mongoose from 'mongoose';
import Agenda from 'agenda';

export const setupDatabase = () => {
  mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });

  const db = mongoose.connection;

  db.on('error', () => {
    console.log('---FAILED to connect to mongoose');
  });
  db.once('open', () => {
    console.log('+++Connected to mongoose');
  });
};

export const agenda = () => {
  console.log('Setup of Agenda');
  const agenda = new Agenda({db: {address: process.env.MONGO_URL}});
  agenda.on('ready', function() {
    console.log('Agenda ready');
    agenda.start();
  });
  return agenda;
};
