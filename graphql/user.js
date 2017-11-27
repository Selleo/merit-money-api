import { User } from '../models';

import composeWithMongoose from 'graphql-compose-mongoose';

const UserTC = composeWithMongoose(User, {});

UserTC.addResolver({
  name: 'currentUser',
  args: {},
  type: UserTC,
  resolve: ({context}) => context,
});

export default UserTC;
