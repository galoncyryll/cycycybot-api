const graphql = require('graphql');

// queries
const { mod } = require('./queries/modQuery');
const { banphrases } = require('./queries/banPhraseQuery');
const { customcommands } = require('./queries/customCommandQuery');

// mutations
const { addMod, delMod } = require('./mutations/addDelMod');
const { addBanPhrase, delBanPhrase } = require('./mutations/addDelBanPhrase');
const { enableLogger, disableLogger } = require('./mutations/setLogger');
const { addCmd } = require('./mutations/addDelCmd');

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
    addCmd,
    addMod,
    delMod,
    addBanPhrase,
    delBanPhrase,
    enableLogger,
    disableLogger,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
