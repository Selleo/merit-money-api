import { GQC } from 'graphql-compose';

import {
  UserTC,
  OrganizationTC,
  KudoTC,
  UserOrganizationTC,
} from './graphql';

GQC.rootQuery().addFields({
  currentUser: UserTC.getResolver('currentUser'),
  organizationById: OrganizationTC.getResolver('findById'),
  allOrganizations: OrganizationTC.getResolver('findMany'),
  userByIds: UserTC.getResolver('findByIds'),
  user: UserTC.getResolver('findOne'),
  allUsers: UserTC.getResolver('findMany'),
  allKudos: KudoTC.getResolver('findMany'),
  organizationUsers: UserOrganizationTC.getResolver('findMany'),
});

GQC.rootMutation().addFields({
  createOrganization: OrganizationTC.getResolver('createOne'),
  updateOrganization: OrganizationTC.getResolver('updateById'),
  removeOrganization: OrganizationTC.getResolver('removeById'),
  createUser: UserTC.getResolver('createOne'),
  updateUser: UserTC.getResolver('updateById'),
  removeUser: UserTC.getResolver('removeById'),
  createKudo: KudoTC.getResolver('createOne'),
  createOrganizationUser: UserOrganizationTC.getResolver('createOne'),
  removeOrganizationUser: UserOrganizationTC.getResolver('removeById'),
});

export default GQC.buildSchema();
