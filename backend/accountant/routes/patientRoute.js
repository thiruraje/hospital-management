const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;
const Patient = require('../../doctor/model/patientModel');
const AdmitedPatient = require('../../doctor/model/admitedPatientModel');

const router = express.Router();

router.get('/admited-patient-info/:patientId', async (req, res) => {
    try {
        const admited_patients = await Patient.aggregate([{
            $match: {
                $and: [{
                    _id: ObjectId(req.params.patientId)
                },{
                    condition: "admit"
                },{
                    is_discharge : false
                }]
            }
        }, ]);
        res.send(admited_patients[0]);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/admited-patients', async (req, res) => {
    try {
        const admited_patients = await AdmitedPatient.find();
        res.send(admited_patients);
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

module.exports = router;