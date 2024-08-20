// common/routers/authRouter.js
const express = require('express');
const { login, signUp } = require('../apis/authAPI'); // Import login and signup functions
const router = express.Router();

// Signup Route
router.post('/signup', signUp); // Use the signup function

// Login Route
router.post('/login', login); // Use the login function

module.exports = router; // Export the router
