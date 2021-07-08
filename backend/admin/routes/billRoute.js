const mongoose = require('mongoose');
var express = require('express');

const Patient = require('../../doctor/model/patientModel');
const AdmitedPatient = require('../../doctor/model/admitedPatientModel');
const DailyPatient = require('../../doctor/model/checkupDetailModel');



const router = express.Router();


router.get('/patient-bill', async (req, res) => {
    try {
        const patients = await Patient.find({});
        var datas  = {
            patients : patients,
        }
        res.send(datas);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/admited-patient-bill', async (req, res) => {
    try {
        const admited_patients = await AdmitedPatient.aggregate([{
                $lookup: {
                    from: "patients", 
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient_info"
                }
            },
            {   $unwind:"$patient_info" },
            {
                $lookup:{
                    from: "rooms", 
                    localField: "patient_info.room", 
                    foreignField: "_id",
                    as: "room_info"
                }
            },
            {   $unwind:"$room_info" },
            {
                $lookup:{
                    from: "doctors", 
                    localField: "patient_info.doctor", 
                    foreignField: "_id",
                    as: "doctor_info"
                }
            },
            {   $unwind:"$doctor_info" },
        ]);

        const daily_patients = await DailyPatient.aggregate([{
                $lookup: {
                    from: "patients", 
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient_info"
                }
            },
            {   $unwind:"$patient_info" },
            {
                $lookup:{
                    from: "doctors", 
                    localField: "patient_info.doctor", 
                    foreignField: "_id",
                    as: "doctor_info"
                }
            },
            {   $unwind:"$doctor_info" },
        ]);

        const data = {
            daily_patients:daily_patients,
            admited_patients:admited_patients
            
        }
        res.send(data);
    } catch (error) {
        res.send({ message: error.message });
    }
});



module.exports = router;