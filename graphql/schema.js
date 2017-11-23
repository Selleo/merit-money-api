import graphql from 'graphql';
import composeWithMongoose from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';

import UserModel from '../mongoose/user';
import OrganizationModel from '../mongoose/organization';
import KudoModel from '../mongoose/kudo';
import UserOrganizationModel from '../mongoose/userOrganization';

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
  organizationMany: OrganizationTC.getResolver('findMany'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  kudosMany: KudoTC.getResolver('findMany'),
  usersUnderOrganization: UserOrganizationTC.getResolver('findMany'),
});

GQC.rootMutation().addFields({
  organizationCreate: OrganizationTC.getResolver('createOne'),
  organizationUpdateById: OrganizationTC.getResolver('updateById'),
  organizationRemoveById: OrganizationTC.getResolver('removeById'),
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userRemoveById: UserTC.getResolver('removeById'),
  kudoCreate: KudoTC.getResolver('createOne'),
  createOrganizationUser: UserOrganizationTC.getResolver('createOne'),
  removeOrganizationUser: UserOrganizationTC.getResolver('removeById'),
});

const graphqlSchema = GQC.buildSchema();
export default graphqlSchema;
