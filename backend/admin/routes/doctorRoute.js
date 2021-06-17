var express = require('express');
const Doctor = require('../model/doctorModel');

const router = express.Router();

router.post('/createdoctor', async (req, res) => {
    try {
        const doctor = new Doctor({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            country: req.body.country,
            gender: req.body.gender,
            type: req.body.type,
            password: "1234"
        });
        const newDoctor = await doctor.save();
        res.send(newDoctor);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.send(doctors);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;