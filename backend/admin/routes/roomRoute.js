var express = require('express');
const Room = require('../model/roomModel');

const router = express.Router();


router.post('/createroom', async (req, res) => {
    try {
        const room = new Room({
            no: req.body.no,
            floor: req.body.floor,
        });
        const newRoom = await room.save();
        res.send(newRoom);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;