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
        min: 1886, // The first gasoline-powered automobile was made in 1886
    },
    owner_id: {
        type: String, // You might want to consider using ObjectId if you have a reference to an Owner collection
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Car status can be active or inactive
        default: 'active', // Default status is active
    },
    type: {
        type: String,
        enum: ['sedan', 'suv', 'mini', 'xl', 'truck', 'other'], // Corrected spelling from 'sadan'
        default: 'mini', // Default type is mini
    },
    color: {
        type: String, // New field for car color
        trim: true, // To ensure no extra spaces
    },
    mileage: {
        type: Number, // New field for mileage (in kilometers or miles)
        min: 0, // Mileage cannot be negative
    },
    speed: {
        type: Number, // New field for speed (e.g., maximum speed in km/h or mph)
        min: 0, // Speed cannot be negative
    },
    plateNumber: {
        type: String, // New field for vehicle plate number
        trim: true, // To ensure no extra spaces
        unique: true, // Ensure plate numbers are unique
    },
    registrationNumber: {
        type: String, // New field for vehicle registration number
        trim: true, // To ensure no extra spaces
        unique: true, // Ensure registration numbers are unique
    },
    insuranceNumber: {
        type: String, // New field for insurance details
        trim: true, // To ensure no extra spaces
    },
    isAssigned:{
        type: Number, // New field for insurance details
        required: true
    },
}, { timestamps: true });

// Create a Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car; // Export the Car model
