const mongoose = require('mongoose');
var express = require('express');
const ObjectId = mongoose.Types.ObjectId;
const Patient = require('../model/patientModel');



const router = express.Router();


router.get('/patient-bill/:doctorId', async (req, res) => {
    try {
        console.log(req.params.doctorId)
        const patients = await Patient.find({doctor: ObjectId(req.params.doctorId)});
        var datas  = {
            patients : patients,
        }
        res.send(datas);
    } catch (error) {
        res.send({ message: error.message });
    }
});



module.exports = router;