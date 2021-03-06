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
    address: { type: String, required: true },
    condition: { type: String, default: null },
    room: {type:Schema.Types.ObjectId, ref:'Room',default: null},
    is_discharge: { type: Boolean, default: false },
    bed_alloted_time: {type: Date, default: Date.now},
    discharge_time: {type: Date, default: null},
    createdAt: {type: Date, default: Date.now}
    
});

const patientModel = mongoose.model('Patient', patientSchema);

module.exports = patientModel;