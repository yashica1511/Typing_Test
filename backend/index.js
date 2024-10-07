const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Middleware to parse incoming requests with JSON

// Connect to MongoDB
connectDB(); // Connect to MongoDB

// Use the auth routes
app.use('/api/auth', authRoutes);

// Fallback for 404 errors
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
