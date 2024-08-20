
const Car = require('../db/models/carModel'); 

const addCar = async (req, res) => {
    const { name, model, year, status } = req.body.data;
    try {
        const car = new Car({ name, model, year, status });
        await car.save();
        res.status(201).json({error:false, message:"Vehicle added successfully"}); // Respond with the created car
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:true,message: 'Server error' });
    }
};

// Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all cars
        res.status(200).json({error:false,data:cars});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:true,message: 'Server error' });
    }
};

// Update a car
const updateCar = async (req, res) => {
    const { id } = req.body.data; 
    const { name, model, year, status } = req.body.data;
    

    try {
        const car = await Car.findByIdAndUpdate(id, { name, model, year, status }, { new: true, runValidators: true });
        if (!car) {
            return res.status(404).json({ error:true, message: 'Car not found' });
        }
        res.status(200).json({error:false, message:"Updated Successfully"}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true ,message:'Server error' });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    const { id } = req.body.data;  // Get car ID from parameters

    try {
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).json({ error:true, message: 'Car not found' });
        }
        res.status(204).send(); // Respond with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:true, message: 'Server error' });
    }
};

module.exports = { addCar, getAllCars, updateCar, deleteCar }; // Export the functions
