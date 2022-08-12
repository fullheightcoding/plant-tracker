const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const mongoSanitize = require('express-mongo-sanitize');

//mongodb conn string
const url = 'mongodb://localhost/PlantTrackerDB';

const app = express();

//use json with body limit of 20kb
app.use(express.json({ limit: '20kb' }));
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());
//remove data from input using defaults
// app.use(mongoSanitize());

//connect to mongodb
mongoose.connect(url, {useNewUrlParser: true});
const connection = mongoose.connection;

//open connection to mongodb
connection.on('open', function() {
    console.log('mongodb connected');
});

//create a router
const plantRouter = require('./routes/plantRouter');
app.use('/plants', plantRouter);
const userRouter = require('./routes/userRouter');
app.use('/users', userRouter);

//listen on port x for express
app.listen(9000, function() {
    console.log('server started');
});