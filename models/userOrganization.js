import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';

const Schema = mongoose.Schema;
const userOrganizationSchema = new Schema({
  pending: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  generated_info: {
    kudos_left: Number,
    last_amount_of_kudos: Number, //that's how we will get collectors
    total_amount_of_kudos: Number,
    is_hamster: Boolean,
  },
}, { collection: 'UserOrganizations' });

userOrganizationSchema.plugin(idValidator);

const UserOrganization = mongoose.model('UserOrganization', userOrganizationSchema);

export default UserOrganization;
