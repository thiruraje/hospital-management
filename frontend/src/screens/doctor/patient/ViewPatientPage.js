import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

import React, { useEffect, useState } from 'react';

function ViewPatientPage(props) {
    useEffect(() => {
        fetchDoctors();
    }, []);

    const [patients, setPatinet] = useState([]);

    const fetchDoctors = async () => {
        const data = await fetch('http://localhost:4000/api/doctor/patients');
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
                                <h1 className="m-0 text-dark">View Doctors</h1>
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
                            </tr>
                        </thead>
                        <tbody>
                        {
                                patients.map(doctor => (
                                    <tr key={doctor._id}>
                                    <td>#</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.age}</td>
                                    <td>{doctor.gender}</td>
                                    <td>{doctor.weigth}</td>
                                    <td>{doctor.heigth}</td>
                                   
                                  </tr>
                                ))
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

export default ViewPatientPage;