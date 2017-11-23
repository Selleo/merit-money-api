import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  email_verified: Boolean,
  name: String,
  given_name: String,
  family_name: String,
  picture: String,
  gender: String,
  locale: String,
  user_id: {
    type: String,
    index: true,
  },
  nickname: String,
  created_at: Date,
}, {collection: 'Users'});

const User = mongoose.model('User', UserSchema);

export default User;
