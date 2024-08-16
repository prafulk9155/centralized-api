// routers/exampleRouter.js
const express = require('express');
const router = express.Router();
const exampleMiddleware = require('../middleware/exampleMiddleware'); // Ensure this middleware exists
const Example = require('../db/models/exampleModel'); // Assuming this model exists

// Use the middleware
router.use(exampleMiddleware);

// Sample route
router.get('/example', async (req, res) => {
    try {
        const examples = await Example.find();
        res.json(examples);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ensure to export the router
module.exports = router;
