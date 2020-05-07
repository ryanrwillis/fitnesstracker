const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @route get api/secure/profile
// @desc get a users profile details post-login
// @access Public
router.get('/profile', (req, res) => {
    User.findByIdAndUpdate(req.user['_id'], {
        "$push": {
            'items': 'pizza'
        }
    }).then(result =>{
        console.log(result)
    })
    res.json({
        message : 'Success',
        user : req.user,
    })
});

module.exports = router;