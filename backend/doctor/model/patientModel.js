const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    mobile: { type: String, required: true ,unique: true, },
    gender: { type: String, required: true },
    heigth: { type: String, required: true },
    weigth: { type: String, required: true },
    temperature: { type: String, required: true },
    address: { type: String, required: true },
    
});

const patientModel = mongoose.model('Patient', patientSchema);

module.exports = patientModel;