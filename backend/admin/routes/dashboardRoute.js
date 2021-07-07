var express = require('express');

const Doctor = require('../model/doctorModel');
const Room = require('../model/roomModel');
const Patient = require('../../doctor/model/patientModel');
const Checkup = require('../../doctor/model/checkupDetailModel');
const AdmitedPatient = require('../../doctor/model/admitedPatientModel');



const router = express.Router();

router.get('/dashboard-data', async (req, res) => {
    try {
        var doctors = await Doctor.aggregate([{
            $group: {
                _id: null,
                "count": { "$sum": 1 }
            },
        },

        ]);

        var rooms = await Room.aggregate([{
            $match: { is_occupied: false }
        },
        {
            $group: {
                _id: null,
                "count": { "$sum": 1 }
            },
        },

        ]);
        var patients = await Patient.aggregate([{
            $group: {
                _id: null,
                "count": { "$sum": 1 }
            },
        },

        ]);
        var total_income = 0;
        const daily_income = await Checkup.aggregate([
            { $match : { is_paid : true } },
            {
                $group: {
                    _id: null,
                    total_fee: { $sum: "$fee" },
                },
            },
        ]
        );
        const admited_patients_fee = await AdmitedPatient.aggregate([
            { $match : { is_paid : true } },
            {
                $group: {
                    _id: null,
                    total_fee: { $sum: "$fee" },
                },
            },
        ]
        );
        if (admited_patients_fee.length !== 0 ) {
            total_income = total_income + admited_patients_fee[0].total_fee;
        }
        if(daily_income.length !== 0){
            total_income = total_income + daily_income[0].total_fee;
        }
        var data = {
            doctors: doctors[0],
            rooms: rooms[0],
            patients: patients[0],
            income: total_income,

        }
        res.send(data);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;
