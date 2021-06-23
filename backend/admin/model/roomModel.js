const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    no: { type: String, required: true },
    floor: { type: String, required: true },
    is_occupied: { type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now}
});

const roomModel = mongoose.model('Room', roomSchema);

module.exports = roomModel;