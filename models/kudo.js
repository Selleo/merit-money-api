import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';
import UserOrganization from './userOrganization';

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
  comment: String,
  paid: Boolean,
}, { collection: 'Kudos' });

kudoSchema.plugin(idValidator);

//URGENT - do not change into arrow functions
kudoSchema.pre('save', function(next) {
  if(this.giverId === this.receiverId) {
    var err = new Error('You can not give kudo to yourself!');
    next(err);
  }
  next();
});

//URGENT - do not change into arrow functions
kudoSchema.pre('save', function(next) {
  if(this.amount < 1 || this.amount > 5) {
    var err = new Error('You can give once 1,2,3,4 or 5 kudos. Number of kudos can not be negative or bigger than 5');
    next(err);
  }
  next();
});

//URGENT - do not change into arrow functions
kudoSchema.pre('save', function(next) {
  const self = this;
  UserOrganization.findOne({userId: this.giverId, organizationId: this.organizationId}, (err, userOrganization) => {
    if(err) { next(err); }

    if(userOrganization.generatedInfo.kudosLeft >= self.amount){
      next();
    } else {
      var err_ = new Error('You do not have enough Kudos!');
      next(err_);
    }
  });
});

//URGENT - do not change into arrow functions
kudoSchema.post('save', function(doc, next) {
  const self = this;
  const filterCriteria = {userId: doc.giverId, organizationId: doc.organizationId};

  UserOrganization.findOne(filterCriteria, (err, userOrganization) => {
    if(err) { next(err); }
    const newKudoAmount = userOrganization.generatedInfo.kudosLeft - self.amount;
    userOrganization.generatedInfo.kudosLeft = newKudoAmount;
    userOrganization.markModified('generatedInfo');

    UserOrganization.update(filterCriteria, {
      '$set': {
        'generatedInfo.kudosLeft': newKudoAmount,
      }
    }, (err) =>{
      err ? next(err) : next();
    });
  });
});

export default mongoose.model('Kudo', kudoSchema);
