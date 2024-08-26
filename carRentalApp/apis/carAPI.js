
const Car = require('../db/models/carModel'); 

const addCar = async (req, res) => {
    const { name, model, year, status, owner_id, type, color, mileage, speed, plateNumber, registrationNumber, insuranceNumber,isAssigned } = req.body.data;
    try {
        const car = new Car({ name, model, year, status, owner_id, type, color, mileage, speed, plateNumber, registrationNumber, insuranceNumber ,isAssigned});
        await car.save();
        res.status(201).json({ error: false, message: "Vehicle added successfully", data: car }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: error.message });
    }
};


// Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ status: 'active' }, );
        const totalCount = cars.length;      // Fetch all cars with active status
        res.status(200).json({ error: false, data: cars, total_count: totalCount});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: error.message });
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
    const { id } = req.body.data;  

    try {
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).json({ error:true, message: 'Car not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:true, message: 'Server error' });
    }
};

module.exports = { addCar, getAllCars, updateCar, deleteCar }; // Export the functions
