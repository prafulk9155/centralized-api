const express = require('express');
const { connectToDatabase } = require('./common/connections/mongoConnection'); 
const carRental = require('./carRentalApp/app'); 
const jobPortalRouter = require('./jobPortalApp/routers/jobPortalRouter'); 
const authRouter = require('./common/routers/authRouter');
const emailRouter = require('./common/routers/');

const cors = require('cors');

// Use CORS middleware
app.use(cors());

// Or configure CORS options if you need more specific settings
app.use(cors({
    origin: 'http://your-react-app-url', // Replace with the URL of your React app
    methods: ['GET', 'POST'], // Allowed methods
}));
    



const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send({
        error:false, message:"Centralized Api Running..."
    });
});
// Connect to the database for Car Rental
connectToDatabase('carRental');



// Use Car Rental management routes under '/carRental'
app.use('/api/carRental', carRental);

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
