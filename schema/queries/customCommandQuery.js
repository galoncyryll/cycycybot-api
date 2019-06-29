const graphql = require('graphql');

const Commands = require('../../models/customCommandsDB');

const {
  GraphQLString,
  GraphQLList,
} = graphql;

const { CustomCommandsType } = require('../types/customCommandsType');

const customcommands = {
  type: new GraphQLList(CustomCommandsType),
  args: { serverID: { type: GraphQLString } },
  resolve(parent, args) {
    return Commands.find({ serverID: args.serverID }).then(res => res);
  },
};

module.exports = {
  customcommands,
};
