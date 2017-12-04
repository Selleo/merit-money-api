import { Participant } from '../models';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import OrganizationTC from './organization';
import UserTC from './user';
import KudoTC from './kudo';

const ParticipantTC = composeWithMongoose(Participant, {});

export default ParticipantTC;

ParticipantTC.addRelation(
  'organization',
  {
    resolver: () => OrganizationTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.organizationId,
    },
    projection: { organizationId: true },
  }
);

ParticipantTC.addRelation(
  'user',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.userId,
    },
    projection: { userId: true },
  }
);

ParticipantTC.addRelation(
  'kudo',
  {
    resolver: KudoTC.getResolver('findMany'),
    prepareArgs: {
      giverId: (_, __, { _id }) => _id,
      organizationId: source => source.organizationId,
    },
    projection: { giverId: true, organizationId: true },
  }
);
