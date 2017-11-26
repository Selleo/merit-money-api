import KudoModel from '../models/kudo';
import composeWithMongoose from 'graphql-compose-mongoose';

import OrganizationTC from './organization';
import UserTC from './user';

const KudoTC = composeWithMongoose(KudoModel, {});

export default KudoTC;

KudoTC.addRelation(
  'organization',
  {
    resolver: () => OrganizationTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.organizationId,
    },
    projection: { organizationId: true },
  }
);

KudoTC.addRelation(
  'giver',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.giverId,
    },
    projection: { giverId: true },
  }
);

KudoTC.addRelation(
  'receiver',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.receiverId,
    },
    projection: { receiverId: true },
  }
);
