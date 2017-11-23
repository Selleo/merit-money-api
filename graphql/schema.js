import composeWithMongoose from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';

import UserModel from '../models/user';
import OrganizationModel from '../models/organization';
import KudoModel from '../models/kudo';
import UserOrganizationModel from '../models/userOrganization';

const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeWithMongoose(UserModel, customizationOptions);
const OrganizationTC = composeWithMongoose(OrganizationModel, customizationOptions);
const KudoTC = composeWithMongoose(KudoModel, customizationOptions);
const UserOrganizationTC = composeWithMongoose(UserOrganizationModel, customizationOptions);

GQC.rootQuery().addFields({
  currentUser: {
    type: 'JSON',
    resolve(root, args, context) {
      return context;
    }
  },
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
