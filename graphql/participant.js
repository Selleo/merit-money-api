import { Participant, Organization } from '../models';
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
      filter: (source, args, { _id }) =>  {
        // const organization = await Organization.findById(source.organizationId).exec();
        // console.log(organization.lastReset);
        return ({
          organizationId: source.organizationId,
          receiverId: source.userId,
          giverId: _id,
          // createdAt: { '$gt':  organization.lastReset },
        });
      }
    },
    projection: { userId: true, organizationId: true, organization: true },
  }
);
