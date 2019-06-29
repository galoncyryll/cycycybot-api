const graphql = require('graphql');
const mongoose = require('mongoose');

// types
const { ModType, mod } = require('./modtype/modtype');
const { BanPhraseType, banphrases } = require('./banphrasetype/banphrasetype');
const { CustomCommandsType, customcommands } = require('./customcommandtype/customcommandtype');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLNonNull 
    } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        mod,
        banphrases,
        customcommands
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMod: {
            type: ModType,
            args:{
                id: { type: GraphQLString },
                serverID: { type: new GraphQLNonNull(GraphQLString) },
                serverName: { type: new GraphQLNonNull(GraphQLString) },
                modName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let mod = new Mod({
                    _id: mongoose.Types.ObjectId(),
                    serverID: args.serverID,
                    serverName: args.serverName,
                    modName: args.modName
                });

                return Mod.find({ serverID: args.serverID }).then(res => {
                    if(res.length>=1) {
                        return "already added";
                    } else {
                        return mod.save();
                    }
                })
            }
        },
        addBanPhrase: {
            type: BanPhraseType,
            args:{
                id: { type: GraphQLString },
                serverID: { type: new GraphQLNonNull(GraphQLString) },
                banphrase: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let bp = new BanPhrase({
                    _id: mongoose.Types.ObjectId(),
                    serverID: args.serverID,
                    banphrase: args.banphrase
                });

                return BanPhrase.find({ serverID: args.serverID, banphrase: args.banphrase }).then(res => {
                    if(res.length >= 1) {
                        return "already exists";
                    } else {
                        return bp.save();
                    }
                })
            }
        },
        delBanPhrase: {
            type: BanPhraseType,
            args:{
                id: { type: GraphQLString },
                serverID: { type: new GraphQLNonNull(GraphQLString) },
                banphrase: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return BanPhrase.deleteOne({ serverID: args.serverID, banphrase: args.banphrase });
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});