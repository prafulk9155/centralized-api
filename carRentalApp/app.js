const express = require('express');
const carApi = require('./routers/carAPI'); 

const router = express.Router();

// Example route for Car Rental API
router.get('/', (req, res) => {
    res.send('Car Rental main API');
});

router.use('/car', carApi);


module.exports = router;
