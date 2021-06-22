const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;

const Doctor = require('../model/doctorModel');
const Patient = require('../../doctor/model/patientModel');
const Checkup = require('../../doctor/model/checkupDetailModel');



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



module.exports = router;