import composeWithMongoose from 'graphql-compose-mongoose';
import { Organization } from '../models';

const OrganizationTC = composeWithMongoose(Organization, {});

export default OrganizationTC;
