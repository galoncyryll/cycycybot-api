const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_PASS, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to db');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('Listening on port 5000...');
});