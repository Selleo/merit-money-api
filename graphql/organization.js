import composeWithMongoose from 'graphql-compose-mongoose';
import OrganizationModel from '../models/organization';

const OrganizationTC = composeWithMongoose(OrganizationModel, {});

export default OrganizationTC;
