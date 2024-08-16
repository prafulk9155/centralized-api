// connections/mongoConnection.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
};

module.exports = { connectToDatabase };
