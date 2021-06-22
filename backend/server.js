var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors')



mongoose
  .connect("mongodb://localhost:27017/hospo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));
var conn = mongoose.connection;

conn.on('connected', function () {
  console.log('database is connected successfully');
});
conn.on('disconnected', function () {
  console.log('database is disconnected successfully');
})

const adminAuthRoute  = require('./admin/routes/authRoute');
const adminDoctorRoute  = require('./admin/routes/doctorRoute');
const adminRoomRoute  = require('./admin/routes/roomRoute');
const adminDashboardRoute  = require('./admin/routes/dashboardRoute');
const adminBillRoute  = require('./admin/routes/billRoute');



const doctorAuthRoute  = require('./doctor/routes/authRoute');
const doctorPatientRoute  = require('./doctor/routes/patientRoute');
const doctorDashboardRoute  = require('./doctor/routes/dashboardRoute');



var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/api/admin', adminAuthRoute);
app.use('/api/admin/', adminDoctorRoute);
app.use('/api/admin/', adminRoomRoute);
app.use('/api/admin/', adminDashboardRoute);
app.use('/api/admin/', adminBillRoute);



app.use('/api/doctor', doctorAuthRoute);
app.use('/api/doctor', doctorPatientRoute);
app.use('/api/doctor', doctorDashboardRoute);





app.get('/', function (req, res) {
  res.end('home')
});
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})