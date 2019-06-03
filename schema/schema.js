const graphql = require('graphql');
const Mod = require('../models/modDBtest');
const mongoose = require('mongoose');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const ModType = new GraphQLObjectType({
    name: 'Mod',
    fields: () => ({
        id: { type: GraphQLString },
        serverID:  { type: GraphQLString },
        serverName: { type: GraphQLString },
        modName: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        mod: {
            type: ModType,
            args: { serverID: { type: GraphQLString } },
            resolve(parent, args){
                return Mod.findOne({serverID: args.serverID}).then(res => {
                    return res;
                });
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
                id: {type: GraphQLString },
                serverID: { type: GraphQLString },
                serverName: { type: GraphQLString },
                modName: { type: GraphQLString }
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});