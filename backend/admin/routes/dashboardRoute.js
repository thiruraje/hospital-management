var express = require('express');

const Doctor = require('../model/doctorModel');
const Room = require('../model/roomModel');
const Patient = require('../../doctor/model/patientModel');
const Checkup = require('../../doctor/model/checkupDetailModel');


const router = express.Router();

router.get('/dashboard-data', async (req, res) => {
    try {
        var doctors = await Doctor.aggregate([
            {
                $group: {
                    _id: null,
                    "count": { "$sum": 1 }
                },
            },

        ]);

        var rooms = await Room.aggregate([
            {
                $group: {
                    _id: null,
                    "count": { "$sum": 1 }
                },
            },

        ]);
        var patients = await Patient.aggregate([
            {
                $group: {
                    _id: null,
                    "count": { "$sum": 1 }
                },
            },

        ]);

        const income = await Checkup.aggregate([
            {
                $group: {
                    _id: null,
                    total_fee: { $sum: "$fee" },
                },
            },
        ]
        );
        var data = {
            doctors: doctors[0],
            rooms: rooms[0],
            patients: patients[0],
            income: income[0],
        }

        res.send(data);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;
