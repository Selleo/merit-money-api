import mongoose from 'mongoose';
var Schema = mongoose.Schema;

import id_validator from 'mongoose-id-validator';

var kudoSchema = new Schema({
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
}, {collection: 'Kudos'});

kudoSchema.plugin(id_validator);

var Kudo = mongoose.model('Kudo', kudoSchema);

export default Kudo;
