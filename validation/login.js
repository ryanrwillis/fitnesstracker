const validator = require('validator')
const is_empty = require('is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    // If a field is empty, replace it with an empty string for validator library compatibility
    data.email = is_empty(data.email) ? "" : data.email;
    data.password = is_empty(data.password) ? "" : data.password;

    // Email
    if(validator.isEmpty(data.email)){
        errors['email'] = "Email field is empty. This field is required"
    } else if(!validator.isEmail){
        errors['email'] = "Email field is invalid"
    }

    // Passwords
    if(validator.isEmpty(data.password)){
        errors['password'] = "Password field is empty. This field is required"
    }

    return {
        errors,
        isValid: is_empty(errors)
    }
};