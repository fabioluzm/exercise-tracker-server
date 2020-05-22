// import mongoose
const mongoose = require('mongoose');

// make all schemas a mongoose model schemas
const Schema = mongoose.Schema;

// instaciate a new schema
const userSchema = new Schema(
    {
        username: {
            type        : String,   // string type
            required    : true,     // it's required
            unique      : true,     // has to be unique
            trim        : true,     // trim whitespaces from it
            minlength   : 3         // has to bem 3 chars long
        },
    },
    {
        timestamps      : true,     // timestamps for creation and modified
    }
);

// create a model based on the schema
const User = mongoose.model('User', userSchema);
// export the model
module.exports = User;