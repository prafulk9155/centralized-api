
const mongoose = require('mongoose');
require('dotenv').config(); 

const connectToDatabase = async (appType) => {
    let dbURI;

    if (appType === 'carRental') {
        dbURI = process.env.MONGODB_CAR_RENTAL_URI;
    } else if (appType === 'jobPortal') {
        dbURI = process.env.MONGODB_JOB_PORTAL_URI;
    } else {
        throw new Error('Invalid application type specified!');
    }

    try {
        await mongoose.connect(dbURI); // Removed deprecated options
        console.log(`Connected to MongoDB: ${appType}`);
    } catch (err) {
        console.error(`Failed to connect to MongoDB: ${appType}`, err);
        throw err;
    }
};

module.exports = { connectToDatabase };
