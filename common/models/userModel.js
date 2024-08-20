const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model for use in other files
