// jobPortalApp/routers/jobPortalRouter.js
const express = require('express');
const router = express.Router();

// Example Route
router.get('/', (req, res) => {
    res.send('Trip Guide  API');
});

module.exports = router; // Export the router
