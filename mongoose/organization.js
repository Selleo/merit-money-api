import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// create a schema
var organizationSchema = new Schema({
  organizationId: Number,
  name: String
}, {collection: 'Organizations'});

// we need to create a model using it
var Organization = mongoose.model('Organization', organizationSchema);

export default Organization;