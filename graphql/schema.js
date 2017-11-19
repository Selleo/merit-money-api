import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql/type';

import OrganizationMongoose from '../mongoose/organization';

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var organizationType = new GraphQLObjectType({
  name: 'organization',
  description: 'organization',
  fields: () => ({
    organizationId: {
      type: (GraphQLInt),
      description: 'Id of organization.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the organization.',
    },
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      organization: {
        type: new GraphQLList(organizationType),
        args: {
          organizationId: {
            name: 'organizationId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {organizationId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var foundItems = new Promise((resolve, reject) => {
            OrganizationMongoose.find({ organizationId }, projections,(err, todos) => {
              err ? reject(err) : resolve(todos);
            });
          });

          return foundItems;
        }
      }
    }
  })
});

export default schema;
