import { User } from '../models';

import composeWithMongoose from 'graphql-compose-mongoose';

const UserTC = composeWithMongoose(User, {});

UserTC.addResolver({
  name: 'currentUser',
  args: {
    filter: false,
    limit: false,
    sort: false,
  },
  type: UserTC,
  resolve: ({context}) => context,
});

export default UserTC;
