const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    doctor: {type:Schema.Types.ObjectId, ref:'Doctor'},
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