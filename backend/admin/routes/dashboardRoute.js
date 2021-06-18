var express = require('express');

const Doctor = require('../model/doctorModel');
const Room = require('../model/roomModel');
const Patient = require('../../doctor/model/patientModel');

const router = express.Router();

router.get('/dashboard-data', async (req, res) => {
    try {
        var doctors = await Doctor.find();
        var rooms = await Room.find();
        var patients = await Patient.find();
        var data = {
            doctors :doctors,
            rooms :rooms,
            patients:patients
        }

        res.send(data);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;
