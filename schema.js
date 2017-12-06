import { GQC } from 'graphql-compose';

import {
  UserTC,
  OrganizationTC,
  KudoTC,
  ParticipantTC,
} from './graphql';

GQC.rootQuery().addFields({
  currentUser: UserTC.getResolver('currentUser'),
  organizationById: OrganizationTC.getResolver('findById'),
  allOrganizations: OrganizationTC.getResolver('findMany'),
  userByIds: UserTC.getResolver('findByIds'),
  user: UserTC.getResolver('findOne'),
  allUsers: UserTC.getResolver('findMany'),
  allKudos: KudoTC.getResolver('findMany'),
  participants: ParticipantTC.getResolver('findMany'),
  participantsWithoutCurrentUser: ParticipantTC.getResolver('findMany').wrapResolve(next => (rp) => {
    rp.args.filter = Object.assign({ userId: {'$nin': rp.context._id} }, rp.args.filter);
    return next(rp);
  })
});

GQC.rootMutation().addFields({
  createOrganization: OrganizationTC.getResolver('createOne'),
  updateOrganization: OrganizationTC.getResolver('updateById'),
  removeOrganization: OrganizationTC.getResolver('removeById'),
  createUser: UserTC.getResolver('createOne'),
  updateUser: UserTC.getResolver('updateById'),
  removeUser: UserTC.getResolver('removeById'),
  createKudo: KudoTC.getResolver('createOne'),
  createParticipant: ParticipantTC.getResolver('createOne'),
  removeParticipant: ParticipantTC.getResolver('removeById'),
});

export default GQC.buildSchema();
