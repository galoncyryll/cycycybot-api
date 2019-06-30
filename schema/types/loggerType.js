const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphql;

const LoggerType = new GraphQLObjectType({
  name: 'Logger',
  fields: () => ({
    id: { type: GraphQLString },
    serverID: { type: GraphQLString },
    serverName: { type: GraphQLString },
    logChannelID: { type: GraphQLString },
    isEnabled: { type: GraphQLString },
    leaveQueueLimit: { type: GraphQLInt },
  }),
});

module.exports = {
  LoggerType,
};
