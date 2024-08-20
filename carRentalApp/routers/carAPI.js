// carRentalApp/routers/carRouter.js
const express = require('express');
const { addCar, getAllCars, updateCar, deleteCar } = require('../apis/carAPI'); // Import car API functions

const router = express.Router();

// Route to add a car
router.post('/add', addCar);

// Route to get all cars
router.post('/list', getAllCars); 

// Route to update a car by ID
router.post('/edit', updateCar);

// Route to delete a car by ID
router.post('/delete', deleteCar);

module.exports = router; // Export the router
