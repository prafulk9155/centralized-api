const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./common/connections/mongoConnection'); 
const carRental = require('./carRentalApp/app'); 
const jobPortalRouter = require('./jobPortalApp/routers/jobPortalRouter'); 
const authRouter = require('./common/routers/authRouter');
const emailRouter = require('./common/routers/emailRouter'); // Ensure this is the correct path

const app = express(); // Initialize Express app

// Configure CORS to allow all origins
app.use(cors({
    origin: '*', // Allow all origins (consider whitelisting in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
}));

app.use(express.json()); // Use express.json() for parsing JSON request bodies

// Test endpoint to verify server
app.get('/', (req, res) => {
    res.send({
        error: false,
        message: "Centralized API Running..."
    });
});

// Connect to the database for Car Rental
connectToDatabase('carRental');

// Use Car Rental management routes under '/api/carRental'
app.use('/api/carRental', carRental);

// Connect to the database for Job Portal
connectToDatabase('jobPortal');

// Use Job Portal routes under '/api/jobPortal'
app.use('/api/jobPortal', jobPortalRouter);

// Use common Auth routes under '/api/auth'
app.use('/api/auth', authRouter);

// Use email routes under '/api/email'
app.use('/api/email', emailRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
