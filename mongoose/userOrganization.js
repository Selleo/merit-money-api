import mongoose from 'mongoose';
var Schema = mongoose.Schema;

import id_validator from 'mongoose-id-validator';

var userOrganizationSchema = new Schema({
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
}, {collection: 'UserOrganizations'});

userOrganizationSchema.plugin(id_validator);

var UserOrganization = mongoose.model('UserOrganization', userOrganizationSchema);

export default UserOrganization;
