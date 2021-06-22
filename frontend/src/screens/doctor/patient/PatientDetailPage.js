
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
function PatientDetailPage(props) {

    const { id } = props.match.params

    useEffect(() => {
        fetchPatientDetail();
    }, []);

    const [patientData, setPatientData] = useState([]);
    const [patientCheckupData, setPatientCheckupData] = useState([]);
    const fetchPatientDetail = async () => {
        const data = await fetch(`http://localhost:4000/api/doctor/patient-detail/${id}`);
        const patients_detail = await data.json();
        console.log(patients_detail)
        setPatientData(patients_detail.patient);
        setPatientCheckupData(patients_detail.checkups);
    };

    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });



    return (
        <div>
            <Header />
            <Menu />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                    <h1 className="m-0 text-dark">Patient Details</h1>
                    </div>{/* /.container-fluid */}
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
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    
                    <table className="table table-borderless">
                        <thead>
                            <tr style={{borderTop:'1px solid gray'}}>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Fee</th>
                                <th scope="col">Problem</th>
                                <th scope="col">Solution</th>

                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "-webkit-center"}}>
                            {
                                (patientCheckupData.length != 0) ?
                                    patientCheckupData.map(checkup => (
                                        <tr key={checkup._id} style={{borderTop:'1px solid gray'}}>
                                            <td>#</td>
                                            <td>{formatter.format(Date.parse(checkup.createdAt))}</td>
                                            <td>{checkup.fee}</td>
                                            <td>
                                                <table >
                                                    {checkup.detail.map(d => (
                                                        <tr style={{ borderTop: "dimgray" }}>
                                                            <td>{d.problem} </td>
                                                        </tr>
                                                    ))}
                                                </table>

                                            </td>
                                            <td>
                                                <table >
                                                    {checkup.detail.map(d => (
                                                        <tr>
                                                            <td>{d.solution} </td>
                                                        </tr>
                                                    ))}
                                                </table>

                                            </td>

                                        </tr>
                                    ))
                                    :
                                    <td ><p>No check'up data found</p></td>
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

export default PatientDetailPage;