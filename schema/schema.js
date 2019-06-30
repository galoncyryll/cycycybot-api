const graphql = require('graphql');

// queries
const { mod } = require('./queries/modQuery');
const { banphrases } = require('./queries/banPhraseQuery');
const { customcommands } = require('./queries/customCommandQuery');

// mutations
const { addmod, delmod } = require('./mutations/addDelMod');
const { addbanphrase, delbanphrase } = require('./mutations/addDelBanPhrase');
const { enableLogger } = require('./mutations/setLogger');

const {
  GraphQLObjectType,
  GraphQLSchema,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    mod,
    banphrases,
    customcommands,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    addmod,
    delmod,
    addbanphrase,
    delbanphrase,
    enableLogger,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
