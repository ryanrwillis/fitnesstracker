// Dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs')

// Validation Functions
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Models
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register a user
// @access Public
router.post('/register', (req, res) =>{
    const {errors, isValid} = validateRegisterInput(req.body)
    console.log(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email}).then(user =>{
        if(user){
            return res.status(400).json({
                email: 'A user registered to this Email already exists'
            })
        } else{
            // Create new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash users password
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login and return JWT token
// @access Public
router.post('/login', (req, res)=>{
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user =>{
        if(!user){
            return res.status(404).json({emailNotFound: 'A user with this email has not been found'});
        }

        // Using bcrypt check the password
        bcrypt.compare(password, user.password).then(isMatch =>{
            if(isMatch){
                // create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(payload, keys.secretOrKey, {
                    expiresIn: 86400 // 1 day
                }, (err, token) =>{
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        name: user.name,
                        id: user._id
                    })
                })
            } else{
               return res.status(400).json({passwordIncorrect: 'The password entered is incorrect'})
            }
        })
    })
})

module.exports = router;