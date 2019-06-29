const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;


const CustomCommandsType = new GraphQLObjectType({
  name: 'CustomCommands',
  fields: () => ({
    id: { type: GraphQLString },
    serverID: { type: GraphQLString },
    serverName: { type: GraphQLString },
    commandName: { type: GraphQLString },
    commandRes: { type: GraphQLString },
  }),
});

module.exports = {
  CustomCommandsType,
};
