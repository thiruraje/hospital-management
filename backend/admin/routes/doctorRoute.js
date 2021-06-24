const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;

const Doctor = require('../model/doctorModel');
const Patient = require('../../doctor/model/patientModel');
const Checkup = require('../../doctor/model/checkupDetailModel');
const AdmitedPatient = require('../../doctor/model/admitedPatientModel');


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

router.get('/doctor-detail/:doctor_id', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ '_id': req.params.doctor_id });
        const patients = await Patient.find({ 'doctor': req.params.doctor_id });
        const datas = {
            doctor: doctor,
            patients: patients,
        }

        res.send(datas);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/patient-fee/:condition/:patient_id', async (req, res) => {
    try {
        var patient_fee;
        if( req.params.condition === "admit"){
            patient_fee = await AdmitedPatient.aggregate([
                { $match: { patient: ObjectId(req.params.patient_id) } },
                {
                    $group: {
                        _id: null,
                        total_fee: { $sum: "$fee" },
                    },
                },
            ]
            );
        }else{
            patient_fee =  await Checkup.aggregate([
                { $match: { patient: ObjectId(req.params.patient_id) } },
                {
                    $group: {
                        _id: "$patient",
                        total_fee: { $sum: "$fee" },
                    },
                },
            ]
            );

        }
        res.send(patient_fee[0]);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/handled-doctor/:doctor_id', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ '_id': req.params.doctor_id });
        res.send(doctor);
    } catch (error) {
        res.send({ message: error.message });
    }
    
});

module.exports = router;