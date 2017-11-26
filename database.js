if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

import mongoose from 'mongoose';

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
