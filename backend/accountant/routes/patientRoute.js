const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;
const Patient = require('../../doctor/model/patientModel');
const AdmitedPatient = require('../../doctor/model/admitedPatientModel');
const DailyPatient = require('../../doctor/model/checkupDetailModel');


const router = express.Router();


router.get('/admited-patients', async (req, res) => {
    try {
        // const admited_patients = await AdmitedPatient.find();
        const admited_patients = await AdmitedPatient.aggregate([{
            $lookup: {
                from: "patients", 
                localField: "patient",
                foreignField: "_id",
                as: "patient_info"
            }
        },
        {   $unwind:"$patient_info" },
    ]);
        res.send(admited_patients);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/daily-patients', async (req, res) => {
    try {
        const daily_patients = await DailyPatient.aggregate([{
            $lookup: {
                from: "patients", 
                localField: "patient",
                foreignField: "_id",
                as: "patient_info"
            }
        },
        {   $unwind:"$patient_info" },
    ]);
        res.send(daily_patients);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.post('/admited-patient-paid-update', async (req, res) => {
    try {
        
        const adPatient = await AdmitedPatient.updateOne({
            patient: ObjectId(req.body.patientId)
        }, {
            $set: {
                is_paid:req.body.status
            }
        });
        res.send(adPatient)
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.post('/daily-patient-paid-update', async (req, res) => {
    try {
        
        const adPatient = await DailyPatient.updateOne({
            _id: ObjectId(req.body.checkupId)
        }, {
            $set: {
                is_paid:req.body.status
            }
        });
        res.send(adPatient)
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

module.exports = router;