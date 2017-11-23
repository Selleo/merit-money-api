import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var organizationSchema = new Schema({
  name: String,
  kudos_per_reset: {
    type: Number,
    default: 20,
    required: true
  },
  resets: [Date],
  last_reset: Date,
}, {collection: 'Organizations'});

var Organization = mongoose.model('Organization', organizationSchema);

export default Organization;
