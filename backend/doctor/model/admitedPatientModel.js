const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chectupDetailSchema = new mongoose.Schema({
    medicine: { type: String, required: true },
    cost: { type: Number, required: true },
  });

const admitedPatientSchema = new mongoose.Schema({
    patient: {type:Schema.Types.ObjectId, ref:'Patient'},
    fee: { type: Number, required: true },
    detail: [chectupDetailSchema],
    createdAt: {type: Date, default: Date.now}
});

const admitedPatientModel = mongoose.model('AdmitedPatient', admitedPatientSchema);

module.exports = admitedPatientModel;