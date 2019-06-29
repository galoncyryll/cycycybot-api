const graphql = require('graphql');
const BanPhrase = require('../../models/banPhraseDB');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const BanPhraseType = new GraphQLObjectType({
  name: 'BanPhrase',
  fields: () => ({
      id: { type: GraphQLString },
      serverID: { type: GraphQLString },
      banphrase: { type: GraphQLString }
  })
});

const banphrases = {
    type: new GraphQLList(BanPhraseType),
    args: { serverID: { type: GraphQLString } },
    resolve(parent, args) {
        return BanPhrase.find({ serverID: args.serverID }).then(res => {
            return res
        })
    }
}


module.exports = {
  BanPhraseType,
  banphrases
}