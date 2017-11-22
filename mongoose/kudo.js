import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var kudoSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  giver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: Number,
  created_at: Date,
  comment: String,
}, {collection: 'Kudos'});

var Kudo = mongoose.model('Kudo', kudoSchema);

export default Kudo;