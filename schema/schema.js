const graphql = require('graphql');

// queries
const { mod } = require('./queries/modQuery');
const { banphrases } = require('./queries/banPhraseQuery');
const { customcommands } = require('./queries/customCommandQuery');

// mutations
const { addmod } = require('./mutations/addDelMod');
const { addbanphrase, delbanphrase } = require('./mutations/addBanPhrase');

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
  name: 'Mutation',
  fields: {
    addmod,
    addbanphrase,
    delbanphrase,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
