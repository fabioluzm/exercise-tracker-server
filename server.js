// import 'express' and 'CORS'
const express = require('express');
const cors = require('cors');
// import mongoose to connect to mongoDB
const mongoose = require('mongoose');

// config our environment variables in the '.env' file
require('dotenv').config();

// create express server
const app = express();
// server port to be used
const port = process.env.PORT || 5000;

// middleware CORS
app.use(cors());
// middleware express to parse JSON so can be able
// to send and receive json
app.use(express.json());

// get uri connection to mongDB from .env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfuly');
});

// import the files to be used by the server as a router
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// use the router create for each file
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// starts the server by listening at server designated port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});