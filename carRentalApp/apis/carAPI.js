
const Car = require('../db/models/carModel'); 

const addCar = async (req, res) => {
    const { name, model, year, status } = req.body.data;
    try {
        const car = new Car({ name, model, year, status });
        await car.save();
        res.status(201).json(car); // Respond with the created car
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all cars
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a car
const updateCar = async (req, res) => {
    const { id } = req.body.data; 
    const { name, model, year, status } = req.body.data;
    console.log(req)

    try {
        const car = await Car.findByIdAndUpdate(id, { name, model, year, status }, { new: true, runValidators: true });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json(car); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    const { id } = req.params; // Get car ID from parameters

    try {
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(204).send(); // Respond with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addCar, getAllCars, updateCar, deleteCar }; // Export the functions
