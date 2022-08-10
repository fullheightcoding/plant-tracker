const express = require('express');
const mongoose = require('mongoose');
//mongodb conn string
const url = 'mongodb://localhost/PlantTrackerDB';

const app = express();

//use json
app.use(express.json());

//connect to mongodb
mongoose.connect(url, {useNewUrlParser: true});
const connection = mongoose.connection;

//open connection to mongodb
connection.on('open', function() {
    console.log('mongodb connected');
});

//create a router
const plantRouter = require('./routes/plants');
app.use('/plants', plantRouter);

//listen on port x for express
app.listen(9000, function() {
    console.log('server started');
})