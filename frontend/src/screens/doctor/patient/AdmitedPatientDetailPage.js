
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { discharge } from '../../../action/doctorAction';


function AdmitedPatientDetailPage(props) {
    const dispatch = useDispatch();
    const { id } = props.match.params

    useEffect(() => {
        fetchPatientDetail();
    }, []);

    const [patientData, setPatientData] = useState([]);
    const [patientCheckupList, setPatientCheckupList] = useState([]);
    const [patientCheckupInfo, setPatientCheckupInfo] = useState([]);
    const fetchPatientDetail = async () => {
        const data = await fetch(`http://localhost:4000/api/doctor/admited-patient-detail/${id}`);
        const patients_detail = await data.json();
        setPatientData(patients_detail.patient);
        setPatientCheckupInfo(patients_detail.checkups);
        if(patients_detail.checkups !== null){
            setPatientCheckupList(patients_detail.checkups.detail);
        }
        
    };

    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    const handleDischarge = () => {
        dispatch(discharge(patientData._id));
        props.history.push('/doctor/viewPatient');
    };
    return (
        <div>
            <Header />
            <Menu />

            <div className="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Admited patient's details</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                {
                                    (patientData.is_discharge)?
                                    <h6>Discharged</h6>:
                                    <button className="btn btn-danger" onClick={handleDischarge}>Discharge</button> 
                                }
                            
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Name : </th>
                                    <td style={{ textAlign: "left" }}> {patientData.name}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Age : </th>
                                    <td style={{ textAlign: "left" }}> {patientData.age}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Mobile : </th>
                                    <td style={{ textAlign: "left" }}>{patientData.mobile}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Gender : </th>
                                    <td style={{ textAlign: "left" }}>{patientData.gender}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Address : </th>
                                    <td style={{ textAlign: "left" }}>{patientData.address}</td>
                                </tr>
                                <br></br>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Total fee (Room + medicine's) : </th>
                                    {
                                        patientCheckupInfo !== null ?

                                            <td style={{ textAlign: "left" }}>{patientCheckupInfo.fee}</td> :
                                            <td style={{ textAlign: "left" }}>5000</td>
                                    }

                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Medicine Name</th>
                                <th scope="col">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patientCheckupInfo !== null ?
                                    patientCheckupList.map(patient => (
                                        <tr>
                                            <td>#</td>
                                            <td>{patient.medicine}</td>
                                            <td>{patient.cost}</td>
                                        </tr>
                                    )) :
                                    <td>No data's found!!</td>

                            }

                        </tbody>
                    </table>

                </section>
                {/* /.content */}
            </div>
            <Footer />

        </div>
    );
}

export default AdmitedPatientDetailPage;