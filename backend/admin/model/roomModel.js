const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    no: { type: String, required: true },
    floor: { type: String, required: true },
    type: { type: String, required: true },
    bed_count: { type: String, required: true },
});

const roomModel = mongoose.model('Room', roomSchema);

module.exports = roomModel;