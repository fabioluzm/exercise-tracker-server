// Import express router
const router = require('express').Router();

// create router for the users model
let User = require('../models/user.model');

// route for search users with http get request
router.route('/').get((req, res) => {
    User.find()                                                 // mongoose method that return a promise
        .then(users => res.json(users))                         // if sucess result from DB returned in json format 
        .catch(err => res.status(400).json('Error: ' + err));   // if error return error code with error message
});

// route for add users with http post request
router.route('/add').post((req, res) => {
    const username = req.body.username;                         // username is part of the request body

    const newUser = new User({                                  // create a new user instance
        username
    });

    newUser.save()                                              // mongoose method to save into database
        .then(() => res.json('User Added!'))                    // if sucess return message in json format
        .catch(err => res.status(400).json('Error: ' + err));   // if error return error code with error message
});

// route for search current exercice
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

// export the router
module.exports = router;