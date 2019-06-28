const graphql = require('graphql');
const mongoose = require('mongoose');

// Models
const Mod = require('../models/modDBtest');
const BanPhrase = require('../models/banPhraseDB');
const Commands = require('../models/customCommandsDB');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLNonNull, 
        GraphQLList } = graphql;

const ModType = new GraphQLObjectType({
    name: 'Mod',
    fields: () => ({
        id: { type: GraphQLString },
        serverID:  { type: GraphQLString },
        serverName: { type: GraphQLString },
        modName: { type: GraphQLString }
    })
});

const BanPhraseType = new GraphQLObjectType({
    name: 'BanPhrase',
    fields: () => ({
        id: { type: GraphQLString },
        serverID: { type: GraphQLString },
        banphrase: { type: GraphQLString }
    })
});

const CustomCommandsType = new GraphQLObjectType({
    name: 'CustomCommands',
    fields: () => ({
        id: { type: GraphQLString },
        serverID: { type: GraphQLString },
        serverName: { type: GraphQLString },
        commandName: { type: GraphQLString },
        commandRes: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        mod: {
            type: ModType,
            args: { serverID: { type: GraphQLString } },
            resolve(parent, args){
                return Mod.findOne({ serverID: args.serverID }).then(res => {
                    return res;
                })
            }
        },
        banphrases: {
            type: new GraphQLList(BanPhraseType),
            args: { serverID: { type: GraphQLString } },
            resolve(parent, args) {
                return BanPhrase.find({ serverID: args.serverID }).then(res => {
                    return res
                })
            }
        },
        customcommands: {
            type: new GraphQLList(CustomCommandsType),
            args: { serverID: { type: GraphQLString } },
            resolve(parent, args) {
                return Commands.find({ serverID: args.serverID }).then(res => {
                    return res;
                })
            }
        }
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
                }).catch(err => console.log(err));
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
                }).catch(err => console.log(err));
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
                return BanPhrase.deleteOne({ serverID: args.serverID, banphrase: args.banphrase }).catch(err => console.log(err));
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});