const graphql = require('graphql');
const mongoose = require('mongoose');
const LoggerDB = require('../../models/loggerDB');

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = graphql;

// logger type
const { LoggerType } = require('../types/loggerType');

const enableLogger = {
  type: LoggerType,
  args: {
    id: { type: GraphQLString },
    serverID: { type: GraphQLNonNull(GraphQLString) },
    serverName: { type: GraphQLNonNull(GraphQLString) },
    logChannelID: { type: GraphQLNonNull(GraphQLString) },
    isEnabled: { type: GraphQLNonNull(GraphQLString) },
    leaveQueueLimit: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve(parent, args) {
    const logger = new LoggerDB({
      _id: mongoose.Types.ObjectId(),
      serverID: args.serverID,
      serverName: args.serverName,
      logChannelID: args.logChannelID,
      isEnabled: args.isEnabled,
      leaveQueueLimit: args.leaveQueueLimit,
    });

    LoggerDB.findOne({ serverID: args.serverID }).then((logRes) => {
      if (logRes) {
        return LoggerDB.updateOne({ serverID: args.serverID },
          { isEnabled: args.isEnabled, logChannelID: args.logChannelID, serverName: args.serverName });
      }
      return logger.save();
    });
  },
};

const disableLogger = {
  type: LoggerType,
  args: {
    id: { type: GraphQLString },
    serverID: { type: GraphQLNonNull(GraphQLString) },
    isEnabled: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    LoggerDB.findOne({ serverID: args.serverID }).then((res) => {
      if (res) {
        return LoggerDB.updateOne({ serverID: args.serverID },
          { isEnabled: args.isEnabled, logChannelID: '' });
      }
    });
  },
};

module.exports = {
  enableLogger,
  disableLogger,
};
