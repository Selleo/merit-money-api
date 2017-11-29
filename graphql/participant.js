import { Participant } from '../models';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import OrganizationTC from './organization';
import UserTC from './user';

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
