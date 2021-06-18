import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';
import Dashboard from './layout/Dashboard';
import { Link } from 'react-router-dom';


function HomePage(props) {
    const doctorSigin = useSelector(state => state.doctorSignin);
    const { loading, doctorInfo, error } = doctorSigin;

    useEffect(() => {
        fetchDatas();
    }, []);

    const [patients_count, setPatientCount] = useState([]);

    const fetchDatas = async () => {
        const doctor_id = encodeURIComponent(doctorInfo._id);
        var data = await fetch(`http://localhost:4000/api/doctor/dashboard-data/${doctor_id}`);
        var datas = await data.json();
        setPatientCount(datas.patients.length)
    };
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
                            <div>
                                {/* {doctorInfo._id} */}
                            </div>
                           
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
                                        <h3>{patients_count}</h3>
                                        <p>Patient Total</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <Link to="/doctor/viewPatient" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                           
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