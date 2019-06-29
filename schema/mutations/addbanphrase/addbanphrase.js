const graphql = require('graphql');
const mongoose = require('mongoose');
const BanPhrase = require('../../../models/banPhraseDB');

const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

// banphrase type
const { BanPhraseType } = require('../../types/banphrasetype');

const addbanphrase = {
  type: BanPhraseType,
  args: {
    id: { type: GraphQLString },
    serverID: { type: new GraphQLNonNull(GraphQLString) },
    banphrase: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    const bp = new BanPhrase({
      _id: mongoose.Types.ObjectId(),
      serverID: args.serverID,
      banphrase: args.banphrase,
    });

    return BanPhrase.find({ serverID: args.serverID, banphrase: args.banphrase }).then((res) => {
      if (res.length >= 1) {
        return 'already exists';
      }
      return bp.save();
    });
  },
};

const delbanphrase = {
  type: BanPhraseType,
  args: {
    id: { type: GraphQLString },
    serverID: { type: new GraphQLNonNull(GraphQLString) },
    banphrase: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    return BanPhrase.deleteOne({ serverID: args.serverID, banphrase: args.banphrase });
  },
};

module.exports = {
  addbanphrase,
  delbanphrase,
};
