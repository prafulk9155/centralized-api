// common/apis/authAPI.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // User model shared across applications
require('dotenv').config(); // Load environment variables

// Signup Function
const signUp = async (req, res) => {
    const { username, email, password } = req.body.data;

    try {
        // Check for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

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
};

// Login Function
const login = async (req, res) => {
    const { email, password } = req.body.data;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a token with user details
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET, // Use your shared JWT secret
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { login, signUp }; // Export the login and signup functions
