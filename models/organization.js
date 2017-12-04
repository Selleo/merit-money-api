import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const organizationSchema = new Schema({
  name: String,
  kudosPerReset: {
    type: Number,
    default: 20,
    required: true
  },
  resets: [Date],
  lastReset: {
    type: Date,
    default: Date.now()
  },
  periodLength: {
    type: Number,
    default: 1000 * 60 * 60 * 24 * 7, //7 days
  },
}, { collection: 'Organizations' });

export default mongoose.model('Organization', organizationSchema);
