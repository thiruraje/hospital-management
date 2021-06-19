const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkupSchema = new mongoose.Schema({
    patient: {type:Schema.Types.ObjectId, ref:'Patient'},
    problem: { type: String, required: true },
    solution: { type: String, required: true },
});

const checkupModel = mongoose.model('Checkup', checkupSchema);

module.exports = checkupModel;