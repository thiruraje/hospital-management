const mongoose = require('mongoose');
var express = require('express');

const Patient = require('../../doctor/model/patientModel');



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