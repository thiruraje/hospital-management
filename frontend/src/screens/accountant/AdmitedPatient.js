import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';
import { Link } from 'react-router-dom';
import Switch from "react-switch";
import axios from "axios";


function AdmitedPatient(props) {

    const [patients, setPatient] = useState([]);


    useEffect(() => {
        fetchData()
    //     
    }, []);
    const fetchData = async()=>{
        const data = await fetch('http://localhost:4000/api/accountant/admited-patients');
        const patients_data = await data.json();
        setPatient(patients_data);

    }

    const handleChange = (index, patientId)=>{
        if(patients[index].is_paid){
            let newArr = [...patients]
            newArr[index].is_paid = false
            setPatient(newArr)
            updatePaidStatus(patientId,false);
        }else{
            let newArr = [...patients]
            newArr[index].is_paid = true
            setPatient(newArr)
            updatePaidStatus(patientId,true);
        }
    }
    const updatePaidStatus = async (patientId,status)=>{
        axios
        .post(`http://localhost:4000/api/accountant/admited-patient-paid-update`,{ patientId,status })
        .then(result => {
            console.log(result);
        })
        .catch(error =>{
            console.log(error);
        }
        );
    }

    return (
        <div>
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Admited Patients</h1>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <section className="content">
                
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Fee's</th>
                                <th scope="col">Discharge/Not</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patients.map((patient,index) => (
                                    <tr key={patient._id}>
                                        <td>#</td>
                                        <td><PatientName patient_id ={patient.patient}/></td>
                                        <td>{patient.fee}</td>
                                        <td><Discharge patient_id ={patient.patient}/></td>
                                        <td>
                                        <Switch 
                                            checked={patient.is_paid}  
                                            onChange={()=>handleChange(index, patient.patient)}
                                        />
                                    
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
            </div>
            <Footer />

        </div>
    );
}

const PatientName = props => {
    const [name, setName] = useState("");
    useEffect(() => {
        fetchDoctorName(props.patient_id);
    }, []);
    const fetchDoctorName = async (patient_id) => {
        const data = await fetch(`http://localhost:4000/api/accountant/admited-patient-info/${patient_id}`);
        const patient = await data.json();
        setName(patient.name);
    };
    return (
        <div>{name}</div>
    );
};
const Discharge = props => {
    const [patient, setPatient] = useState({});
    useEffect(() => {
        fetchDoctorName(props.patient_id);
    }, []);
    const fetchDoctorName = async (patient_id) => {
        const data = await fetch(`http://localhost:4000/api/accountant/admited-patient-info/${patient_id}`);
        const patient = await data.json();
        setPatient(patient);
    };
    return (
        <div>
            {
                (patient.is_discharge)?
                <>Yes</>:<>No</>
            }
        </div>
    );
};

export default AdmitedPatient;