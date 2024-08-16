const express = require('express');
const { signUp,login } = require('../apis/authAPI'); // Import the signUp function
const router = express.Router();

// Sign Up Route
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router; 