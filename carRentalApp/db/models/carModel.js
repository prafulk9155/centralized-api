const mongoose = require('mongoose');

// Define the Car schema
const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    owner_id:{
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Car status can be active or inactive
        default: 'active', // Default status is active
    },
});

// Create a Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car; // Export the Car model
