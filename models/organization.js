import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const organizationSchema = new Schema({
  name: String,
  kudos_per_reset: {
    type: Number,
    default: 20,
    required: true
  },
  resets: [Date],
  last_reset: Date,
}, { collection: 'Organizations' });

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;
