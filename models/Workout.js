const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    history: {
        type: JSON,
        default: {}
    }
});

module.exports = User = mongoose.model("workouts", WorkoutSchema);