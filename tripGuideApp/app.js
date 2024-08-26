// jobPortalApp/app.js
const express = require('express');
const { connectToDatabase } = require('../common/connections/mongoConnection'); 
const jobPortalRouter = require('./routers/tripGuideRouter'); // Import Job Portal routes
const authRouter = require('../common/routers/authRouter'); // Import the common auth router

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to the database
connectToDatabase('jobPortal');

// Use Job Portal routes
app.use('/api/job-portal', jobPortalRouter);

// Use Common Auth Route
app.use('/api/auth', authRouter);

const PORT = process.env.JOB_PORTAL_PORT || 3002; // Specific port for job portal app
app.listen(PORT, () => {
    console.log(`Job Portal App is running on port ${PORT}`);
});
