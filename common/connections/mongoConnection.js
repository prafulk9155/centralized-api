// common/connections/mongoConnection.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables



const connectToDatabase = async (appType) => {
    let dbURI;

    // Choose the database URI based on the application type
    if (appType === 'carRental') {
        dbURI = process.env.MONGODB_CAR_RENTAL_URI;
    } else if (appType === 'jobPortal') {
        dbURI = process.env.MONGODB_JOB_PORTAL_URI;
    } else {
        throw new Error('Invalid application type specified!');
    }

    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB: ${appType}`);
    } catch (err) {
        console.error(`Failed to connect to MongoDB: ${appType}`, err);
        throw err;
    }
};

module.exports = { connectToDatabase };
