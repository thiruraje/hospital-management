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
                                <h1 className="m-0 text-dark">View Patients</h1>
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
                                <th scope="col">Age</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Weigth</th>
                                <th scope="col">Heigth</th>
                                <th scope="col">Admit/Normal</th>
                                <th scope="col">Discharge/Not</th>
                                <th scope="col">Room No</th>
                                <th scope="col">Detail</th>
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
                                            <td>{patient.weigth}</td>
                                            <td>{patient.heigth}</td>
                                            <td>{patient.condition}</td>
                                            <td></td>
                                            <td> {patient.room != null ?
                                                <div>
                                                    <RoomNo roomId={patient.room} />
                                                </div>
                                                : "-"}</td>
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