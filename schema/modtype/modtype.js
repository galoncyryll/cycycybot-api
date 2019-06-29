const graphql = require('graphql');
const Mod = require('../../models/modDBtest');

const { 
  GraphQLObjectType,
  GraphQLString
} = graphql;

const ModType = new GraphQLObjectType({
  name: 'Mod',
  fields: () => ({
      id: { type: GraphQLString },
      serverID:  { type: GraphQLString },
      serverName: { type: GraphQLString },
      modName: { type: GraphQLString }
  })
});

const mod = {
    type: ModType,
    args: { serverID: { type: GraphQLString } },
    resolve(parent, args){
        return Mod.findOne({ serverID: args.serverID }).then(res => {
            return res;
        })
    }
}


module.exports = {
  ModType,
  mod
}