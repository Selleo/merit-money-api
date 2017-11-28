import { User } from '../models';
import { toCamelCase } from 'case-converter'

export const checkIfUserExists = (req, res, next) => {
  User.findOne({ userId : req.user.sub }, (err, user) => {
    if (err) { console.log(err) }
    if (!user) {
      const userData =  toCamelCase(req.user)
      User.create({ ...userData, userId: req.user.sub }, (err, user) => {
        if (err) { console.log(err) }
        next();
      });
    } else {
      req.fullUser = user;
      next();
    }
  });
};

export const setupFirstUserAsCurrent = (req, res, next) => {
  User.findOne({}, (err, user) => {
    if (err) { console.log(err) }
    req.fullUser = user;
    next();
  });
};
