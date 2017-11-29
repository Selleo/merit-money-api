import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';

import Organization from './organization';

const Schema = mongoose.Schema;
const participantSchema = new Schema({
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
}, { collection: 'Participants' });

participantSchema.plugin(idValidator);

//URGENT - do not change into arrow functions
participantSchema.pre('save', function(next) {
  Organization.findOne({_id: this.organizationId}).then((organization) => {
    this.generatedInfo = {
      kudosLeft: organization.kudosPerReset,
      totalAmountOfKudos: 0,
      lastAmountOfKudos: 0,
      isHamster: false,
    },
    next();
  });
});

export default mongoose.model('Participant', participantSchema);
