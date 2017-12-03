if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

import mongoose from 'mongoose';
import Agenda from 'agenda';
import { Organization, Participant } from './models/index';

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

  agenda.define('reset organization', {priority: 'high', concurrency: 10}, function(job, done) {
    const { organizationId } = job.attrs.data;
    Organization.findById(organizationId).then((organization) => {
      const lastReset = organization.lastReset;
      Participant.find(organizationId).then((participant) => {
        participant.set('generatedInfo.hamster', !!participant.generatedInfo.kudosLeft);
        const lastAmountOfKudos = Kudo.find({
          organizationId: organizationId,
          receiverId: participand.userId,
          "createdAt.gt": organization.lastReset}).exec((err, docs) => {
            const lastAmountOfKudos = _.sumBy(docs, 'amount');
            participant.set('generatedInto.lastAmountOfKudos', lastAmountOfKudos);
            participant.set('generatedInfo.totalAmountOfKudos', participant.totalAmountOfKudos + participant.lastAmountOfKudos)
            participant.set('kudosLeft', organization.kudosPerReset);
            participant.save();
          })
      })
      organization.set('lastReset', Date.now());
      organization.save();
    })
  });

  agenda.on('ready', function() {
    console.log('Agenda ready');
    const cursor = Organization.find().cursor();
    cursor.on('data', function(doc) {
      console.log('Creating job for ', doc.name);
      const job = agenda.create('reset oragnization', {organizationId: doc._id});
      let organizationNextReset = doc.lastReset + doc.periodTime;
      let i;
      while (i < 100 && organizationNextReset < Date.now()) {
        organizationNextReset += doc.periodTime;
        i++;
      }
      job.schedule(organizationNextReset);
      job.save();
    });
    cursor.on('close', function() {
      agenda.start();
    });
  });
  return agenda;
};
