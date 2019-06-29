const graphql = require('graphql');
const Mod = require('../../../models/modDBtest');

const { GraphQLString } = graphql;

// modtype
const { ModType } = require('../../types/modtype');

const mod = {
  type: ModType,
  args: { serverID: { type: GraphQLString } },
  resolve(parent, args) {
    return Mod.findOne({ serverID: args.serverID }).then(res => res);
  },
};

module.exports = {
  mod,
};
