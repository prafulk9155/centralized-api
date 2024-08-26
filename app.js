const express = require('express');
const { connectToDatabase } = require('./common/connections/mongoConnection'); 
const carRental = require('./carRentalApp/app'); 
const jobPortalRouter = require('./jobPortalApp/routers/jobPortalRouter'); 
const authRouter = require('./common/routers/authRouter');
const tripRouter = require('./tripGuideApp/routers/tripGuideRouter');
const emailRouter = require('./common/routers/emailSender');



const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send({
        error:false, message:"Centralized Api Running..."
    });
});
app.get('/api', (req, res) => {
    res.send({
        error:false, message:"Centralized Main Api Running..."
    });
});
// Connect to the database for Car Rental
connectToDatabase('carRental');



// Use Car Rental management routes under '/carRental'
app.use('/api/carRental', carRental);
app.use('/api/tripGuide', tripRouter);
// Connect to the database for Job Portal
connectToDatabase('jobPortal');

// Use Job Portal routes under '/jobPortal'
app.use('/api/jobPortal', jobPortalRouter);

// Use common Auth routes
app.use('/api/auth', authRouter);
app.use('/api/email', emailRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
