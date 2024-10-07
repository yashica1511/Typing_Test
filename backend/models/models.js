const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const typingTestResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true }, 
    timeTaken: { type: Number, required: true },
    testDate: { type: Date, default: Date.now } 
});

const TypingTestResult = mongoose.model('TypingTestResult', typingTestResultSchema);

module.exports = { User, TypingTestResult };
