// Import express router
const router = require('express').Router();

// create router for the exercises model
let Exercise = require('../models/exercise.model');

// route for search exercises with http get request
router.route('/').get((req, res) => {
    Exercise.find()                                             // mongoose method that return a promise
        .then(exercises => res.json(exercises))                 // if sucess result from DB returned in json format 
        .catch(err => res.status(400).json('Error: ' + err));   // if error return error code with error message
});

// route for add exercises with http post request
router.route('/add').post((req, res) => {
    const username = req.body.username;                         // username is part of the request body
    const description = req.body.description;                   // description is part of the request body
    const duration = Number(req.body.duration);                 // duration is part of the request body
    const date = Date.parse(req.body.date);                     // date is part of the request body

    const newExercise = new Exercise({                          // create a new exercise instance
        username,
        description,
        duration,
        date
    });
    newExercise.save()                                          // mongoose method to save into database
        .then(() => res.json('Exercise Added!'))                // if sucess return message in json format
        .catch(err => res.status(400).json('Error: ' + err));                               // if error return error code with error message
});

// route for search current exercice
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
});

// route for delete current exercice
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// route for update current exercice
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(res.json('Exercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

// export the router
module.exports = router;