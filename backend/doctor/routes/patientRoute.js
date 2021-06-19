var express = require('express');
const Patient = require('../model/patientModel');
const Room = require('../../admin/model/roomModel');

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
            address: req.body.address,
            condition: req.body.condition,
            room: req.body.admitedRoonNo,
        });
        const newPatient = await patient.save();
        
        const room = await Room.findById(req.body.admitedRoonNo);
        room.is_occupied = true;
        const updatedRoom = await room.save();
        res.send(newPatient);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/patients/:doctor_id', async (req, res) => {
    try {
        const patients = await Patient.find({ 'doctor': req.params.doctor_id });
        res.send(patients);
    } catch (error) {
        res.send({ message: error.message });
    }
});


router.get('/availablerooms', async (req, res) => {
    try {
        const rooms = await Room.find({ 'is_occupied': false });
        res.send(rooms);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/roomname/:roomId', async (req, res) => {
    try {
        const room = await Room.findOne({ '_id': req.params.roomId });
        res.send(room.no);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;