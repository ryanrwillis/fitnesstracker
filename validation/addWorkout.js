const validator = require('validator')
const is_empty = require('is-empty');

module.exports = function validateAddWorkout(data){
    let errors = {};
    // If a field is empty, replace it with an empty string for validator library compatibility
    data.name = is_empty(data.name) ? "" : data.name;

    // Name
    if(validator.isEmpty(data.name)){
        errors['name'] = "Name field required"
    }
    if(!validator.isLength(data.name , {min: 1, max: 25})){
        errors['name'] = "Name must be between 1 and 25 characters"
    }

    return{
        errors,
        isValid: is_empty(errors)
    }
};