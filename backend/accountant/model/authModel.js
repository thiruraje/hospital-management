const mongoose = require('mongoose');

const accountantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, index: true, dropDups: true,
    },
    password: { type: String, required: true },
});

const accountantModel = mongoose.model('Accountant', accountantSchema);

module.exports = accountantModel;