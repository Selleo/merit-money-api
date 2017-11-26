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
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  generatedInfo: {
    kudosLeft: Number,
    lastAmountOfKudos: Number, //that's how we will get collectors
    totalAmountOfKudos: Number,
    isHamster: Boolean,
  },
}, { collection: 'UserOrganizations' });

userOrganizationSchema.plugin(idValidator);

const UserOrganization = mongoose.model('UserOrganization', userOrganizationSchema);

export default UserOrganization;
