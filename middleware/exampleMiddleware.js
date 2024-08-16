// middleware/exampleMiddleware.js
const exampleMiddleware = (req, res, next) => {
    console.log("Middleware executed");
    next(); // Call next() to proceed
};

module.exports = exampleMiddleware; 
