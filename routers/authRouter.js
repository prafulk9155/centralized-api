// routers/authRouter.js
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../db/models/userModel'); // User model
const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
