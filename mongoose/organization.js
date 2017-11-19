import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var organizationSchema = new Schema({
  organizationId: Number,
  name: String
}, {collection: 'Organizations'});

var Organization = mongoose.model('Organization', organizationSchema);

export default Organization;