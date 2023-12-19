// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    date: { type: String, required: true },
    selectedBatch: { type: String, required: true },
    feesPaid: { type: Boolean, default: false },
});

const User = mongoose.model('YogaDB', userSchema);

module.exports = User;
