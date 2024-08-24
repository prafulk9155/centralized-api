const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./common/connections/mongoConnection'); 
const carRental = require('./carRentalApp/app'); 
const jobPortalRouter = require('./jobPortalApp/routers/jobPortalRouter'); 
const authRouter = require('./common/routers/authRouter');
const emailRouter = require('./common/routers/emailRouter'); // Update with correct email router path

const app = express(); // Initialize Express app

// Use CORS middleware with default settings (allow all origins)
app.use(cors());

// or configure CORS options if you want to restrict origins
// app.use(cors({
//     origin: ['http://localhost:3000'], // allowed origin(s)
//     methods: ['GET', 'POST'], // Allowed methods
// }));

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
