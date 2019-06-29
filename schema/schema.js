const graphql = require('graphql');

// queries
const { mod } = require('./queries/modquery/modquery');
const { banphrases } = require('./queries/banphrasequery/banphrasequery');
const { customcommands } = require('./queries/customcommandquery/customcommandquery');

// mutations
const { addmod } = require('./mutations/addmod/addmod');
const { addbanphrase, delbanphrase } = require('./mutations/addbanphrase/addbanphrase');

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
