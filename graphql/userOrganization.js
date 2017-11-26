import UserOrganizationModel from '../models/userOrganization';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import OrganizationTC from './organization';
import UserTC from './user';

const UserOrganizationTC = composeWithMongoose(UserOrganizationModel, {});

export default UserOrganizationTC;

UserOrganizationTC.addRelation(
  'organization',
  {
    resolver: () => OrganizationTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.organizationId,
    },
    projection: { organizationId: true },
  }
);

UserOrganizationTC.addRelation(
  'user',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.userId,
    },
    projection: { userId: true },
  }
);
