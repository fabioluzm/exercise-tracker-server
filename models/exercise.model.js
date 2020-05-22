// import mongoose
const mongoose = require('mongoose');

// make all schemas a mongoose model schemas
const Schema = mongoose.Schema;

// instaciate a new schema
const exerciseSchema = new Schema(
    {
        username: {
            type        : String,   // string type
            required    : true,     // it's required
        },
        description: {
            type        : String,   // string type
            required    : true,     // it's required
        },
        duration: {
            type        : Number,   // string type
            required    : true,     // it's required
        },
        date: {
            type        : Date,     // string type
            required    : true,     // it's required
        },

    },
    {
        timestamps      : true,     // timestamps for creation and modified
    }
);

// create a model based on the schema
const Exercise = mongoose.model('Exercise', exerciseSchema);
// export the model
module.exports = Exercise;