
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';

function PatientBill(props) {
    useEffect(() => {
        fetchDatas();
    }, []);

    const [admited_patients, setAdmitedPatient] = useState([]);
    const [daily_patients, setDailyPatient] = useState([]);



    const fetchDatas = async () => {
        var data = await fetch('http://localhost:4000/api/admin/admited-patient-bill');
        var datas = await data.json();
        setAdmitedPatient(datas.admited_patients)
        setDailyPatient(datas.daily_patients)
    };

    
    
    return (
        <div class="wrapper">
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Patient's Bill</h1>
                        </div>
                        </div>
                
                <br></br>
                <section className="content">
                <div class="row">
                <div class="col-lg-5">

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
                                <th scope="col">Handled Doctor</th>
                                <th scope="col">Paid/Not</th>
                                <th scope="col">Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (daily_patients.length != 0) ?
                                    daily_patients.map(patient => (
                                        <tr key={patient._id}>
                                            <td>#</td>
                                            <td>{patient.patient_info.name}</td>
                                            <td>{patient.doctor_info.name}</td>
                                            {
                                                (patient.is_paid)?
                                                <td style={{ color: 'green' }}>Yes</td>:
                                                <td style={{ color: 'red' }}>No</td>
                                            }
                                            <td>{patient.fee}</td>
                                            
                                        </tr>
                                        
                                    ))
                                    :
                                    <td ><p>No daily_patients found</p></td>
                            }
                        </tbody>
                    </table>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-7">
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
                                <th scope="col">Name</th>
                                <th scope="col">Handled Doctor</th>
                                <th scope="col">Room No</th>
                                <th scope="col">Discharge/Not</th>
                                <th scope="col">Paid/Not</th>
                                <th scope="col">Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (admited_patients.length != 0) ?
                                    admited_patients.map(patient => (
                                        <tr key={patient._id}>
                                            <td>{patient.patient_info.name}</td>
                                            <td>{patient.doctor_info.name}</td>
                                            <td>{patient.room_info.no}</td>

                                            {
                                                (patient.patient_info.is_discharge)?
                                                <td>Yes</td>:
                                                <td>No</td>
                                            }
                                            {
                                                (patient.is_paid)?
                                                <td style={{ color: 'green' }}>Yes</td>:
                                                <td style={{ color: 'red' }}>No</td>
                                            }
                                            <td>{patient.fee}</td>

                                        </tr>
                                    ))
                                    :
                                    <td ><p>No admited_patients found</p></td>
                            }
                        </tbody>
                    </table>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    </div>
                   
                   

                </section>
            </div>

            <Footer />
        </div>
    );
}





export default PatientBill;