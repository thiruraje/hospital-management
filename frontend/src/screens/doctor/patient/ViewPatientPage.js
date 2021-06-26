import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function ViewPatientPage(props) {
    const doctorSigin = useSelector(state => state.doctorSignin);
    const { loading, doctorInfo, error } = doctorSigin;
    useEffect(() => {
        fetchPatients();
    }, []);

    const [patients, setPatinet] = useState([]);
    const fetchPatients = async () => {
        const doctor_id = encodeURIComponent(doctorInfo._id);
        const data = await fetch(`http://localhost:4000/api/doctor/patients/${doctor_id}`);
        const patients = await data.json();
        setPatinet(patients);
    };
    return (
        <div>
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark"></h1>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                
                <section className="content">
                <div class="row">
                <div class="col-lg-6">

                <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Daily Patient's Lists
                            </h3>
                            
                        </div>
                        <div class="card-body">
                            <div class="tab-content p-0">
                            <table  className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (patients.length != 0) ?
                                    patients.filter(patient => patient.condition === "normal").map(patient => (
                                        <tr key={patient._id}>
                                            <td>#</td>
                                            <td>{patient.name}</td>
                                            <td>
                                                    <Link to={`/doctor/patientdetail/${patient._id}`}>Detail</Link>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <td ><p>No patients found</p></td>
                            }
                        </tbody>
                    </table>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Admited Patient's Lists
                            </h3>
                            
                        </div>
                        <div class="card-body">
                            <div class="tab-content p-0">
                            <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Discharge/Not</th>
                                <th scope="col">Room No</th>
                                <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (patients.length != 0) ?
                                    patients.filter(patient => patient.condition === "admit").map(patient => (
                                        <tr key={patient._id}>
                                            <td>#</td>
                                            <td>{patient.name}</td>
                                            {
                                                (patient.is_discharge)?
                                                <td>Yes</td>:
                                                <td>No</td>
                                            }
                                            <td><RoomNo roomId={patient.room} /></td>
                                            {
                                                (patient.is_discharge)?
                                                <td><Link to={`/doctor/admited-patient-detail/${patient._id}`} style={{ color: 'red' }}>Detail</Link></td> :
                                                <td><Link to={`/doctor/admited-patient-detail/${patient._id}`} >Detail</Link></td>


                                            }
                                            <td>
                                                    
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <td ><p>No patients found</p></td>
                            }
                        </tbody>
                    </table>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    </div>
                   
                   

                </section>
                {/* /.content */}
            </div>
            <Footer />
        </div>
    );
}
const RoomNo = props => {
    const [name, setName] = useState("");
    useEffect(() => {
        fetchRoomName(props.roomId);
    }, []);
    const fetchRoomName = async (roomId) => {
        const data = await fetch(`http://localhost:4000/api/doctor/roomname/${roomId}`);
        const no = await data.json();
        setName(no)
    };
    return (
        <div>{name}</div>
    );
};
export default ViewPatientPage;