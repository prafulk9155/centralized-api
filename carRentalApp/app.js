const express = require('express');
const carApi = require('./routers/carAPI'); 

const router = express.Router();

// Example route for Car Rental API
router.get('/', (req, res) => {
    res.send({
        error:false, message:"Car Rental Api Running..."
    });
});

router.use('/vehicle', carApi);


module.exports = router;
