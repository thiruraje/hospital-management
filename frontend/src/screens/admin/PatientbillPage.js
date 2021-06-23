
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
                                <th scope="col">Age</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Address</th>
                                <th scope="col">Admit/Normal</th>
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
                                            <td>{patient.age}</td>
                                            <td>{patient.gender}</td>
                                            <td>{patient.address}</td>
                                            <td>{patient.condition}</td>
                                            <td><Fees patientId={patient._id} /></td>
                                           
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

const Fees = props => {
    const [fee, setFee] = useState("");
    useEffect(() => {
        fetchPatientFee(props.patientId);
    }, []);
    const fetchPatientFee = async (patientId) => {
        const data = await fetch(`http://localhost:4000/api/admin/patient-fee/${patientId}`);
        const fee = await data.json();
        setFee(fee['total_fee'])
    };
    return (
        <div>{fee}</div>
    );
};

export default PatientBill;