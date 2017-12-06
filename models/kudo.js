import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';
import Participant from './participant';

const Schema = mongoose.Schema;
const kudoSchema = new Schema({
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  giverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isBrandNew: {
    type: Boolean,
    default: true,
  },
  comment: String,
  paid: Boolean,
}, { collection: 'Kudos' });

kudoSchema.plugin(idValidator);

//URGENT - do not change into arrow functions
kudoSchema.pre('save', function(next) {
  if(this.giverId === this.receiverId) {
    const err = new Error('You can not give kudo to yourself!');
    next(err);
  }
  next();
});

//URGENT - do not change into arrow functions
kudoSchema.pre('save', function(next) {
  if(this.amount < 1 || this.amount > 5) {
    const err = new Error('You can give once 1,2,3,4 or 5 kudos. Number of kudos can not be negative or bigger than 5');
    next(err);
  }
  next();
});

//URGENT - do not change into arrow functions
kudoSchema.pre('save', function(next) {
  const self = this;
  Participant.findOne({userId: this.giverId, organizationId: this.organizationId}, (err, participant) => {
    if(err) { next(err); }

    if(participant.generatedInfo.kudosLeft >= self.amount){
      next();
    } else {
      const err_ = new Error('You do not have enough Kudos!');
      next(err_);
    }
  });
});

//URGENT - do not change into arrow functions
kudoSchema.post('save', function(doc, next) {
  const self = this;
  const filterCriteria = {userId: doc.giverId, organizationId: doc.organizationId};

  Participant.findOne(filterCriteria, (err, participant) => {
    if(err) { next(err); }
    const newKudoAmount = participant.generatedInfo.kudosLeft - self.amount;
    participant.generatedInfo.kudosLeft = newKudoAmount;
    participant.markModified('generatedInfo');

    Participant.update(filterCriteria, {
      '$set': {
        'generatedInfo.kudosLeft': newKudoAmount,
      }
    }, (err) =>{
      err ? next(err) : next();
    });
  });
});

export default mongoose.model('Kudo', kudoSchema);
