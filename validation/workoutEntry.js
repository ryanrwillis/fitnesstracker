const validator = require('validator');
const is_empty = require('is-empty');

module.exports = function validateWorkoutEntry(data){
    let errors = {};
    // If a field is empty, replace it with an empty string for validator library compatibility
    data.sets = is_empty(data.sets) ? "" : data.sets;
    data.reps = is_empty(data.reps) ? "" : data.reps;
    data.weight = is_empty(data.weight) ? "" : data.weight;

    // Sets
    if(validator.isEmpty(data.sets)){
        errors['sets'] = "Sets field required"
    } else if(!validator.isInt(data.sets)){
        errors['sets'] = "Sets must be an integer value"
    } else if(parseInt(data.sets) < 0){
        errors['sets'] = "Sets must be positive"
    }

    // Reps
    if(validator.isEmpty(data.reps)){
        errors['reps'] = "Reps field required"
    } else if(!validator.isInt(data.reps)){
        errors['reps'] = "Reps must be an integer value"
    } else if(parseInt(data.reps) < 0){
        errors['reps'] = "Reps must be positive"
    }

    // Weight
    if(validator.isEmpty(data.weight)){
        errors['weight'] = "Weight field required"
    } else if(!validator.isInt(data.weight)){
        errors['weight'] = "Weight must be an integer value"
    } else if(parseInt(data.weight) < 0){
        errors['weight'] = "Weight must be positive"
    }

    return{
        errors,
        isValid: is_empty(errors)
    }
};