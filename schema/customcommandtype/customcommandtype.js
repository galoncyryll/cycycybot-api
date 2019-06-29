const graphql = require('graphql');

const Commands = require('../../models/customCommandsDB');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const CustomCommandsType = new GraphQLObjectType({
  name: 'CustomCommands',
  fields: () => ({
      id: { type: GraphQLString },
      serverID: { type: GraphQLString },
      serverName: { type: GraphQLString },
      commandName: { type: GraphQLString },
      commandRes: { type: GraphQLString },
  })
});

const customcommands = {
  type: new GraphQLList(CustomCommandsType),
  args: { serverID: { type: GraphQLString } },
  resolve(parent, args) {
      return Commands.find({ serverID: args.serverID }).then(res => {
          return res;
      })
  }
}

module.exports = {
  CustomCommandsType,
  customcommands
}