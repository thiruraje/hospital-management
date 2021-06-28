const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;
const Patient = require('../model/patientModel');
const Checkup = require('../model/checkupDetailModel');
const AdmitedPatient = require('../model/admitedPatientModel');


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

        const find_last_patienst = await Patient.find({}).sort({
            $natural: -1
        }).limit(1);
        if (req.body.condition === "admit") {
            const admitedPatient = new AdmitedPatient({
                patient: find_last_patienst[0]._id,
                fee: 5000,
                detail: [],
            });
            const newadmitedPatient = await admitedPatient.save();
        }

        const room = await Room.findById(req.body.admitedRoonNo);
        room.is_occupied = true;
        const updatedRoom = await room.save();



        res.send(newPatient);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/patients/:doctor_id', async (req, res) => {
    try {
        const patients = await Patient.find({
            'doctor': req.params.doctor_id
        });

        res.send(patients);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/regular-patients/:doctor_id', async (req, res) => {
    try {
        const regular_patients = await Patient.aggregate([{
            $match: {
                $and: [{
                    doctor: ObjectId(req.params.doctor_id)
                }, {
                    condition: "normal"
                }]
            }
        }, ]);
        res.send(regular_patients);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});
router.get('/admited-patients/:doctor_id', async (req, res) => {
    try {
        const regular_patients = await Patient.aggregate([{
            $match: {
                $and: [{
                    doctor: ObjectId(req.params.doctor_id)
                }, {
                    condition: "admit"
                },{
                    is_discharge : false
                }]
            }
        }, ]);
        res.send(regular_patients);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});


router.get('/availablerooms', async (req, res) => {
    try {
        const rooms = await Room.find({
            'is_occupied': false
        });
        res.send(rooms);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/roomname/:roomId', async (req, res) => {
    try {
        const room = await Room.findOne({
            '_id': req.params.roomId
        });
        res.send(room.no);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.post('/regular-patient', async (req, res) => {
    try {
        var datas = req.body.inputList;
        const checkup = new Checkup({
            patient: req.body.patientId,
            fee: req.body.fee,
            detail: datas,
        });
        const newCheckup = await checkup.save();
    } catch (error) {
        console.log(error)
        res.send({
            message: error.message
        });
    }
});

router.post('/admited-patient', async (req, res) => {
    try {
        const data = await AdmitedPatient.find({
            patient: {
                $in: [ObjectId(req.body.patientId)]
            }
        });
        if (data.length !== 0) {
            await AdmitedPatient.updateOne({
                patient: ObjectId(req.body.patientId)
            }, {
                $set: {
                    fee: req.body.fee,
                    detail: req.body.inputList,
                    createdAt: new Date()
                }
            });
        } else {
            const admitedPatient = new AdmitedPatient({
                patient: req.body.patientId,
                fee: req.body.fee,
                detail: req.body.inputList,
            });
            const newadmitedPatient = await admitedPatient.save();
        }
    } catch (error) {
        console.log(error)
        res.send({
            message: error.message
        });
    }
});

router.get('/admited-patient-medi-info/:patient_id', async (req, res) => {
    try {
        const admited_patient_info = await AdmitedPatient.findOne({
            'patient': req.params.patient_id
        });
        if (admited_patient_info.detail.length !== 0) {
            res.send(admited_patient_info);
        } else {
            const empty = {
                detail: [{
                    medicine: "",
                    cost: 0
                }]
            }
            res.send(empty);
        }
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/patient-detail/:patient_id', async (req, res) => {
    try {
        const patient = await Patient.findOne({
            '_id': req.params.patient_id
        });
        const checkups = await Checkup.find({
            'patient': req.params.patient_id
        });
        const data = {
            patient: patient,
            checkups: checkups
        }
        res.send(data);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.get('/admited-patient-detail/:patient_id', async (req, res) => {
    try {
        const patient = await Patient.findOne({
            '_id': req.params.patient_id
        });
        const checkups = await AdmitedPatient.findOne({
            'patient': req.params.patient_id
        });
        const data = {
            patient: patient,
            checkups: checkups
        }
        res.send(data);
    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

router.post('/admited-patient-discharge', async (req, res) => {
    try {
        const patint= await Patient.findOne({_id:req.body.patientId});
        await Patient.updateOne({
            _id: ObjectId(req.body.patientId)
        }, {
            $set: {
                is_discharge: true
            }
        });
        await Room.updateOne({
            _id: ObjectId(patint.room)
        }, {
            $set: {
                is_occupied: false
            }
        });

    } catch (error) {
        res.send({
            message: error.message
        });
    }
});

module.exports = router;