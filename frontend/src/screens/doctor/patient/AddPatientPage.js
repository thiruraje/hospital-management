import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addPatient } from '../../../action/doctorAction';

function AddPatientPage(props) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [heigth, setHeigth] = useState('');
    const [weigth, setWeigth] = useState('');
    const [temperature, setTemperature] = useState('');
    const [address, setAddress] = useState('');

    const mySubmitHandler = (event) => {
        event.preventDefault();
        dispatch(
            addPatient(
            name,
            age,
            mobile,
            gender,
            heigth,
            weigth,
            temperature,
            address
            ));
        props.history.push('/doctor/viewPatient');
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
                                <h1 className="m-0 text-dark">Add Patient</h1>
                            </div>{/* /.col */}

                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>


                <section className="content">
                    <div className="col-sm-12">

                        <hr />
                        <div className="row">
                            <div className="col-xs-24">
                                <div className="box box-info">
                                    <div className="box-body">
                                        <form className="form-horizontal" onSubmit={mySubmitHandler}>
                                            <div className="box-body">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Name</label> <input type="text" className="form-control" name="name"onChange={(e) => setName(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Age</label> <input type="text" className="form-control" name="age"onChange={(e) => setAge(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Mobile</label> <input type="text" className="form-control" name="mobile"onChange={(e) => setMobile(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Gender</label> <select name="gender"onChange={(e) => setGender(e.target.value)} className="form-control">
                                                                    <option value>Select Gender</option>
                                                                    <option>Male</option>
                                                                    <option>Female</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Heigth</label> <input type="text" className="form-control" name="heigth"onChange={(e) => setHeigth(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Weigth</label> <input type="text" className="form-control" name="weigth"onChange={(e) => setWeigth(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>temperature</label> <input type="text" className="form-control" name="temperature"onChange={(e) => setTemperature(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Address</label> <input type="textarea" className="form-control" name="address"onChange={(e) => setAddress(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                                <div align="center">
                                                    <button type="submit" className="btn btn-info">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}
            </div>
            <Footer />

        </div>
    );
}


export default AddPatientPage;