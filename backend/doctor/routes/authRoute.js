var express = require('express');
const Doctor = require('../../admin/model/doctorModel');
const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinDoctor = await Doctor.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (signinDoctor) {
        res.send({
            _id: signinDoctor.id,
            name: signinDoctor.name,
            email: signinDoctor.email,
        });
    } else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
    }
});

module.exports = router;