// app.js
const express = require('express');
const { connectToDatabase } = require('./connections/mongoConnection');
const exampleRouter = require('./routers/exampleRouter');
const authRouter = require('./routers/authRouter');

const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(express.json());
app.use('/api', exampleRouter);
app.use('/api/auth', authRouter); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing
