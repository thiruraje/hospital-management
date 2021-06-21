const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chectupDetailSchema = new mongoose.Schema({
    problem: { type: String, required: true },
    solution: { type: String, required: true },
  });

const checkupSchema = new mongoose.Schema({
    patient: {type:Schema.Types.ObjectId, ref:'Patient'},
    fee: { type: String, required: true },
    detail: [chectupDetailSchema],
    
    createdAt: {type: Date, default: Date.now}
});

const checkupModel = mongoose.model('Checkup', checkupSchema);

module.exports = checkupModel;