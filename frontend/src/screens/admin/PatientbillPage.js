
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

    const [patients, setPatient] = useState([]);

    const fetchDatas = async () => {
        var data = await fetch('http://localhost:4000/api/admin/patient-bill');
        var datas = await data.json();
        setPatient(datas.patients)
    };

    return (
        <div class="wrapper">
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <h1 className="m-0 text-dark">Patient's Bill</h1>
                    </div>
                </div>
                <br></br>
                <section className="content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Handled Doctor</th>
                                <th scope="col">Address</th>
                                <th scope="col">Admit/Normal</th>
                                <th scope="col">Discharge/Not</th>
                                <th scope="col">Fee's</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (patients.length != 0) ?
                                    patients.map(patient => (
                                        <tr key={patient._id}>
                                            <td>#</td>
                                            <td>{patient.name}</td>
                                            <td><Dooctor doctor_id={patient.doctor} /></td>
                                            <td>{patient.address}</td>
                                            <td>{patient.condition}</td>
                                            {
                                                patient.condition === "admit"?
                                                (patient.is_discharge)?
                                                
                                                <td>Yes</td>:
                                                <td>No</td>:
                                                <td>-</td>
                                                

                                            }
                                            
                                            <td><Fees patientId={patient._id} patientCondition={patient.condition} /></td>
                                           
                                        </tr>
                                    ))
                                    :
                                    <td ><p>No patients found</p></td>
                            }
                        </tbody>
                    </table>
                </section>
            </div>

            <Footer />
        </div>
    );
}

const Dooctor = props => {
    const [name, setName] = useState("");
    useEffect(() => {
        console.log(props.doctor_id)
        fetchDoctorName(props.doctor_id);
        
    }, []);
    const fetchDoctorName = async (doctor_id) => {
        const data = await fetch(`http://localhost:4000/api/admin/handled-doctor/${doctor_id}`);
        const doctor = await data.json();
        setName(doctor.name);
    };
    return (
        <div>{name}</div>
    );
};

const Fees = props => {
    const [fee, setFee] = useState("");
    useEffect(() => {
        fetchPatientFee(props.patientId,props.patientCondition);
    }, []);
    const fetchPatientFee = async (patientId,patientCondition) => {
        const data = await fetch(`http://localhost:4000/api/admin/patient-fee/${patientCondition}/${patientId}`);
        const fee = await data.json();
        setFee(fee.total_fee);
    };
    return (
        <div>{fee}</div>
    );
};

export default PatientBill;