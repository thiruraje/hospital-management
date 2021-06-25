
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
    const [filteredPatients, setFilteredPatients] = useState([]);

    const fetchDatas = async () => {
        var data = await fetch('http://localhost:4000/api/admin/patient-bill');
        var datas = await data.json();
        setPatient(datas.patients)
        setFilteredPatients(datas.patients)
    };
    const handlePatientType = (e)=>{
        if(e.target.value !== ""){
            const filteredData = patients.filter(patient => {
                return patient.condition.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setFilteredPatients(filteredData)
        }else{
            setFilteredPatients(patients)
        }
    }
    
    return (
        <div class="wrapper">
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Patient's Bill</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <select name="type"  onChange={handlePatientType} className="form-control">
                                    <option value = "">Select patient type</option>
                                    <option value = "admit">Admit</option>
                                    <option value = "normal">Normal</option>
                                </select>
                            </ol>
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
                                filteredPatients.map(patient => (
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