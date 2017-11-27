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
  lastReset: Date,
}, { collection: 'Organizations' });

export default mongoose.model('Organization', organizationSchema);
