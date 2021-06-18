var express = require('express');
const Patient = require('../model/patientModel');
const router = express.Router();

router.post('/createpatient', async (req, res) => {
    try {
        const patient = new Patient({
            doctor: req.body.doctor_id,
            name: req.body.name,
            age: req.body.age,
            mobile: req.body.mobile,
            gender: req.body.gender,
            heigth: req.body.heigth,
            weigth: req.body.weigth,
            temperature: req.body.temperature,
            address: req.body.address,
        });
        const newPatient = await patient.save();
        res.send(newPatient);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/patients/  :doctor_id', async (req, res) => {
    try {
        const patients = await Patient.find({'doctor':req.params.doctor_id});
        res.send(patients);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;