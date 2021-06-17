const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, index: true, dropDups: true,
    },
    password: { type: String, required: true },
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;