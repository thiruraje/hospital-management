var express = require('express');
const Accountant = require('../model/authModel');

const router = express.Router();
router.post('/signin', async (req, res) => {
    const signinAccountant = await Accountant.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(signinAccountant)
    if (signinAccountant) {
      res.send({
        _id: signinAccountant.id,
        name: signinAccountant.name,
        email: signinAccountant.email,
      });
    } else {
      var err = {};
      err.message = 'Not found'
      err.status = 404;
      res.status(err.status).json(err);
    }
  });

  router.get('/create-Accountant', async (req, res) => {
    try {
      const accountant = new Accountant({
        name: 'ss',
        email: 'acc@gmail.com',
        password: '1234', 
      });
      const newAccountant = await accountant.save();
      res.send(newAccountant);
    } catch (error) {
      res.send({ message: error.message });
    }
  });

  module.exports = router;