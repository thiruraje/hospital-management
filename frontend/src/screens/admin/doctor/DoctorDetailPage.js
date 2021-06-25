
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

function DoctorDetailPage(props) {
    const { id } = props.match.params

    useEffect(() => {
        fetchDoctorDetail();
    }, []);
    const [doctorData, setDoctorData] = useState([]);
    const [patientsData, setPatientsData] = useState([]);
    const fetchDoctorDetail = async () => {
        const data = await fetch(`http://localhost:4000/api/admin/doctor-detail/${id}`);
        const doctor_detail = await data.json();
        setDoctorData(doctor_detail.doctor);
        setPatientsData(doctor_detail.patients);
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
                        <h1 className="m-0 text-dark">Doctor Details</h1>
                    </div>{/* /.container-fluid */}
                </div>
                <section className="content">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Name : </th>
                                    <td style={{ textAlign: "left" }}> {doctorData.name}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Mobile : </th>
                                    <td style={{ textAlign: "left" }}>{doctorData.mobile}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Gender : </th>
                                    <td style={{ textAlign: "left" }}>{doctorData.gender}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Email : </th>
                                    <td style={{ textAlign: "left" }}>{doctorData.email}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Type : </th>
                                    <td style={{ textAlign: "left" }}>{doctorData.type}</td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: "left" }}>Address : </th>
                                    <td style={{ textAlign: "left" }}>{doctorData.address}</td>
                                </tr>
                                <br></br>
                                
                            </tbody>
                        </table>
                    </div>
                    <br></br>

                    <table className="table">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Admit/Not</th>
                                <th scope="col">Discharge/Not</th>
                                <th scope="col">Fee's</th>

                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "-webkit-center"}}>
                            {
                                (patientsData.length != 0) ?
                                    patientsData.map(patient => (
                                        <tr key={patient._id} style={{borderTop:'1px solid gray'}}>
                                            <td>#</td>
                                            <td>{formatter.format(Date.parse(patient.createdAt))}</td>
                                            <td>{patient.name}</td>
                                            <td>{patient.mobile}</td>
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
                                    <td ><p>No patient's data found</p></td>
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

export default DoctorDetailPage;