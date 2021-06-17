const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, index: true, dropDups: true,
    },
    address: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true },
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel;