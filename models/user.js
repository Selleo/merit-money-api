import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  emailVerified: Boolean,
  name: String,
  givenName: String,
  familyName: String,
  picture: String,
  gender: String,
  locale: String,
  userId: {
    type: String,
    index: true,
  },
  nickname: String,
  createdAt: Date,
}, { collection: 'Users' });

const User = mongoose.model('User', UserSchema);

export default User;
