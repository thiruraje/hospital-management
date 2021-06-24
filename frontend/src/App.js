import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Header from './screens/admin/layout/Header';
import Menu from './screens/admin/layout/Menu';
import Dashboard from './screens/admin/layout/Dashboard';
import Footer from './screens/admin/layout/Footer';
import Intro from './screens/Intro';
import AdminLogin from './screens/admin/LoginPage';
import AdminRegister from './screens/admin/RegisterPage';
import AdminHomePage from './screens/admin/HomePage';
import AdminBillPage from './screens/admin/PatientbillPage';

import DoctorPage from './screens/admin/doctor/DoctorPage'
import RoomPage from './screens/admin/room/RoomPage'
import DoctorListPage from './screens/admin/doctor/DoctorListPage'
import RoomListPage from './screens/admin/room/RoomListPage'
import DoctorDetailPage from './screens/admin/doctor/DoctorDetailPage'

import DoctorLogin from './screens/doctor/LoginPage';
import DoctorRegister from './screens/doctor/RegisterPage';
import DoctorHomePage from './screens/doctor/HomePage';
import AddPatientPage from './screens/doctor/patient/AddPatientPage'
import ViewPatientPage from './screens/doctor/patient/ViewPatientPage'
import RegularCheckPage from './screens/doctor/RegularCheckPage'
import AdmitedPatientCheckPage from './screens/doctor/AdmitedPatientPage'

import PatientDetailPage from './screens/doctor/patient/PatientDetailPage'
import AdmitedPatientDetailPage from './screens/doctor/patient/AdmitedPatientDetailPage'





function App() {
  return (
    <BrowserRouter>
      <div class="wrapper">
        <main className="main">
          <div className="content">
            <Route path="/admin/home" component={AdminHomePage} />
            <Route path="/admin/bill" component={AdminBillPage} />
            <Route path="/admin/addDoctor" component={DoctorPage} />
            <Route path="/admin/addRooms" component={RoomPage} />
            <Route path="/admin/viewDoctor" component={DoctorListPage} />
            <Route path="/admin/doctordetail/:id" component={DoctorDetailPage} />
            <Route path="/admin/viewRooms" component={RoomListPage} />
            <Route path="/admin/register" component={AdminRegister} />
            <Route path="/admin/login" component={AdminLogin} />

            <Route path="/doctor/login" component={DoctorLogin} />
            <Route path="/doctor/register" component={DoctorRegister} />
            <Route path="/doctor/home" component={DoctorHomePage} />
            <Route path="/doctor/addPatient" component={AddPatientPage} />
            <Route path="/doctor/viewPatient" component={ViewPatientPage} />
            <Route path="/doctor/regular-checkup" component={RegularCheckPage} />
            <Route path="/doctor/admited-patient-checkup" component={AdmitedPatientCheckPage} />
            <Route path="/doctor/patientdetail/:id" component={PatientDetailPage} />
            <Route path="/doctor/admited-patient-detail/:id" component={AdmitedPatientDetailPage} />
            <Route path="/" exact={true} component={Intro} />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;