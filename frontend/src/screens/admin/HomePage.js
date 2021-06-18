import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';



function HomePage(props) {
    useEffect(() => {
        fetchDatas();
    }, []);

    const [room_count, setRoomCount] = useState([]);
    const [Doctor_count, setDoctorCount] = useState([]);
    const [patients_count, setPatientCount] = useState([]);

    const fetchDatas = async () => {
        var data = await fetch('http://localhost:4000/api/admin/dashboard-data');
        var datas = await data.json();
        setDoctorCount(datas.doctors.length);
        setRoomCount(datas.rooms.length);
        setPatientCount(datas.patients.length)
    };

    var myArray = [1, 2, 3, 4, 5, 6, 7, 8];
    var result = myArray.length;

    return (
        <div class="wrapper">
            <Header />
            <Menu />
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Dashboard</h1>
                            </div>{/* /.col */}

                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">


                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{Doctor_count}</h3>
                                        <p>Doctor Details</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <Link to="/admin/viewDoctor" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{patients_count}</h3>
                                        <p>Patients Details</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{room_count}</h3>
                                        <p>Room Details</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                    <Link to="/admin/viewRooms" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            {/* ./col */}
                        </div>

                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
            <Footer />
        </div>

    );
}


export default HomePage;