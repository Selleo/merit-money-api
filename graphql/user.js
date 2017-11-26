import UserModel from '../models/user';
import composeWithMongoose from 'graphql-compose-mongoose';

const UserTC = composeWithMongoose(UserModel, {});

UserTC.addResolver({
  name: 'currentUser',
  args: {},
  type: UserTC,
  resolve: ({context}) => context,
});

export default UserTC;
