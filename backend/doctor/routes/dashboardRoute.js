var express = require('express');

const Patient = require('../model/patientModel');

const router = express.Router();

router.get('/dashboard-data/:doctor_id', async (req, res) => {
    try {
        var patients = await Patient.find({'doctor':req.params.doctor_id} );
        
        var data = {
            patients:patients
        }
        res.send(data);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;
