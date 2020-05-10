// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Workout = require('../../models/Workout');
const User = require('../../models/User');

// Validation Functions
const validateAddWorkout = require('../../validation/addWorkout');
const validateWorkoutEntry = require('../../validation/workoutEntry')

// @route get api/secure/profile
// @desc get a users profile details post-login
// @access Secured
router.get('/profile', (req, res) => {
    User.findByIdAndUpdate(req.user['_id'], {
        "$push": {
            'items': req.body.item
        }
    }).then(result =>{
        console.log(result)
    })
    res.json({
        message : 'Success',
        user : req.user,
    })
});

// @route post api/secure/workout/add
// @desc add a new workout, takes in body parameter for name
// @access Secured
router.post('/workout/add', (req, res) => {
    const {errors, isValid} = validateAddWorkout(req.body);
    if(!isValid){
        return res.status(400).json(
            errors
        )
    }
    Workout.create({
        name: req.body.name,
        userID: req.user._id,
        history: []
    }).then( (workout) =>{
        res.json({
            success: true,
            workout: workout
        })
    }).catch(error =>{
        res.status(400).json(
            error
        )
    })
});

// @route get api/secure/workout/get-all
// @desc Get all of a users workouts
// @access Secured
router.get('/workout/get-all', (req, res) => {
    Workout.find({
        userID: req.user._id
    }).then(workouts =>{
        res.json(workouts)
    }).catch(error =>{
        res.status(400).json(error)
    })
});

// @route delete api/secure/workout/remove
// @desc delete a workout by it's id, params: body.id
// @access Secured
router.delete('/workout/remove', (req, res)=>{
    Workout.deleteOne({
        _id: req.body.id,
        userID: req.user._id
    }).then( result =>{
        if(result.n === 0){
            return res.status(404).json({error: `Workout with ID ${req.body.id} not found under user with id ${req.user._id}`})
        }
        res.json({
            result
        })
    }).catch( error =>{
        res.status(400).json(error)
    })
});

// @route post api/secure/workout/update
// @desc update a workout history by it's id, params: body.id, entry
// @access Secured

router.post('/workout/update', (req, res) => {
    const {errors, isValid} = validateWorkoutEntry(req.body);
    if(!isValid){
        return res.status(400).json(
            errors
        )
    }

    Workout.findByIdAndUpdate(req.body['id'], {
        "$push": {
            'history': {
                sets: req.body['sets'],
                reps: req.body['reps'],
                date: new Date(),
            }
        }
    }).then(result =>{
        res.json(result)
    }).catch( error =>{
        res.status(400).json(error)
    })

});

module.exports = router;