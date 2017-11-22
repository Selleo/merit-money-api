import mongoose from 'mongoose';
var Schema = mongoose.Schema;

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
    required: true,
  },
  comment: String,
}, {collection: 'Kudos'});

var Kudo = mongoose.model('Kudo', kudoSchema);

export default Kudo;