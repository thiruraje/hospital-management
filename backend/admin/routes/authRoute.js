var express = require('express');
const Admin = require('../model/authModel');

const router = express.Router();
router.post('/signin', async (req, res) => {
    const signinAdmin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(signinAdmin)
    if (signinAdmin) {
      res.send({
        _id: signinAdmin.id,
        name: signinAdmin.name,
        email: signinAdmin.email,
      });
    } else {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }
  });


  
router.get('/createadmin', async (req, res) => {
    try {
      const admin = new Admin({
        name: 'thiru',
        email: 'admin@example.com',
        password: '1234', 
      });
      const newAdmin = await admin.save();
      res.send(newAdmin);
    } catch (error) {
      res.send({ message: error.message });
    }
  });

  module.exports = router;