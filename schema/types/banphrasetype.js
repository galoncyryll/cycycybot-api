const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const BanPhraseType = new GraphQLObjectType({
  name: 'BanPhrase',
  fields: () => ({
    id: { type: GraphQLString },
    serverID: { type: GraphQLString },
    banphrase: { type: GraphQLString },
  }),
});

module.exports = {
  BanPhraseType,
};
