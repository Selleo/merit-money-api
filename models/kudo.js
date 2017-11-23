import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';

const Schema = mongoose.Schema;
const kudoSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  giver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comment: String,
  paid: Boolean,
}, { collection: 'Kudos' });

kudoSchema.plugin(idValidator);

const Kudo = mongoose.model('Kudo', kudoSchema);

export default Kudo;
