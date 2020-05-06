const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users')

const port = process.env.PORT || 5000;
const app = express();

app.use(
    bodyParser.urlencoded({extended: false})
);

const database = require('./config/keys').MONGO_URI;
mongoose.connect(database, {useNewUrlParser: true}).then( ()=>{
    console.log('Connected to Mongo @\n', database)
}).catch(err =>{
    console.log(err)
})

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);

app.listen(port, ()=>{
    console.log('\n\nServer started on port', port)
})