const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;

const Doctor = require('../model/doctorModel');
const Patient = require('../../doctor/model/patientModel');
const Checkup = require('../../doctor/model/checkupDetailModel');



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
        const total_amount = await Patient.aggregate(
            [
                { $match: { doctor: ObjectId(req.params.doctor_id) } },
                {
                    $lookup:
                    {
                        from: "checkups",
                        localField: "_id",
                        foreignField: "patient",
                        as: "checkups",
                    }
                },
                {$unwind: {"path":'$checkups'}},
                {
                    $group:{
                        _id:null,
                        total_fee:{$sum: "$checkups.fee"},
                        count: { $sum: 1 }
                    },
                },
            ]
        );
        const datas = {
            doctor: doctor,
            total_amount : total_amount[0],
            patients: patients,
        }

        res.send(datas);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/patient-fee/:patient_id', async (req, res) => {
    try {
        const patient_fee = await Checkup.aggregate(
            [
                { $match: {patient: ObjectId(req.params.patient_id) } },
                {
                    $group: {
                        _id: "$patient",
                        total_fee: { $sum: "$fee" },
                    },
                },
            ]
        );
        res.send(patient_fee[0]);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;