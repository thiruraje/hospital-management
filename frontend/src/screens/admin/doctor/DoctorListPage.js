import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';


function DoctorListPage(props) {


    useEffect(() => {
        fetchDoctors();
    }, []);

    const [doctors, setItems] = useState([]);

    const fetchDoctors = async () => {
        const data = await fetch('http://localhost:4000/api/admin/doctors');
        const doctors = await data.json();
        setItems(doctors);
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
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Type</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map(doctor => (
                                    <tr key={doctor._id}>
                                    <td>#</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.gender}</td>
                                    <td>{doctor.type}</td>
                                    <td>{doctor.country}</td>
                                   
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


export default DoctorListPage;