const validator = require('validator')
const is_empty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};
    // If a field is empty, replace it with an empty string for validator library compatibility
    data.name = is_empty(data.name) ? "" : data.name;
    data.email = is_empty(data.email) ? "" : data.email;
    data.password = is_empty(data.password) ? "" : data.password;
    data.password2 = is_empty(data.password2) ? "" : data.password2;

    // Name
    if(validator.isEmpty(data.name)){
        errors['name'] = "Name field is empty. This field is required"
    }

    // Email
    if(validator.isEmpty(data.email)){
        errors['email'] = "Email field is empty. This field is required"
    } else if(!validator.isEmail(data.email)){
        errors['email'] = "Email field is invalid"
    }

    // Passwords
    if(validator.isEmpty(data.password)){
        errors['password'] = "Password field is empty. This field is required"
    }

    if(validator.isEmpty(data.password2)){
        errors['password2'] = "Confirm password field is empty. This field is required"
    }

    if(!validator.isLength(data.password , {min: 6, max: 25})){
        errors['password'] = "Password length must be between 6 and 25 characters"
    }

    if(!validator.equals(data.password, data.password2)){
        errors['password2'] = "Passwords need to match"
    }

    return{
        errors,
        isValid: is_empty(errors)
    }
};