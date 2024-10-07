const express = require('express');
const { User, TypingTestResult } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.id; 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Middleware to verify token for typing test routes
router.use(verifyToken);

// GET endpoint to fetch typing test results
router.get('/typingtestresults', async (req, res) => {
    try {
        const results = await TypingTestResult.find(); 
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

// POST endpoint to save typing test results
router.post('/typingtestresults', async (req, res) => {
    const { wpm, accuracy, timeTaken } = req.body; 

    if (wpm === undefined || accuracy === undefined || timeTaken === undefined) {
        return res.status(400).json({ error: 'All fields (wpm, accuracy, timeTaken) are required.' });
    }

    try {
        const result = {
            userId: req.user,
            wpm,
            accuracy,
            timeTaken
        };

        const savedResult = await TypingTestResult.create(result); 
        res.status(201).json(savedResult);
    } catch (error) {
        console.error("Error saving typing test result:", error);
        res.status(500).json({ error: 'Failed to save result', details: error.message });
    }
});


module.exports = router;
