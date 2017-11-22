import composeWithMongoose from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';

import OrganizationModel from '../mongoose/organization';
import UserModel from '../mongoose/user';

const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeWithMongoose(UserModel, customizationOptions);
const OrganizationTC = composeWithMongoose(OrganizationModel, customizationOptions);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
// via graphql-compose it will be much much easier, with less typing
GQC.rootQuery().addFields({
  organizationById: OrganizationTC.getResolver('findById'),
  organizationMany: OrganizationTC.getResolver('findMany'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userConnection: UserTC.getResolver('connection'),
});

GQC.rootMutation().addFields({
  organizationCreate: OrganizationTC.getResolver('createOne'),
  organizationUpdateById: OrganizationTC.getResolver('updateById'),
  organizationRemoveById: OrganizationTC.getResolver('removeById'),
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userRemoveById: UserTC.getResolver('removeById'),
});

const graphqlSchema = GQC.buildSchema();
export default graphqlSchema;