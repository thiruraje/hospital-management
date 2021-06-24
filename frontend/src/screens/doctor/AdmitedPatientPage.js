import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAdmitedPatientCheckup } from '../../action/doctorAction';
import { useHistory } from "react-router-dom";

function AdmitedPatientPage(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const doctorSigin = useSelector(state => state.doctorSignin);
    const { loading, doctorInfo, error } = doctorSigin;

    useEffect(() => {
        fetchPatients();
    }, []);
    const [patients, setPatinet] = useState([]);
    const [patientId, setPatinetId] = useState([]);
    const [inputList, setInputList] = useState([]);
    const fetchPatients = async () => {
        const doctor_id = encodeURIComponent(doctorInfo._id);
        const data = await fetch(`http://localhost:4000/api/doctor/admited-patients/${doctor_id}`);
        const patients = await data.json();
        setPatinet(patients);
    };

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { medicine: "", cost: 0 }]);
    };

    const mySubmitHandler = (event) => {
        event.preventDefault();
        var total_fee = 0;
        inputList.map(function (item) {
            total_fee = total_fee + Number(item.cost);
        });
        dispatch(addAdmitedPatientCheckup(patientId, 5000 + total_fee, inputList));
        history.push('/doctor/viewPatient');
    }
    const patientChange = (e) => {
        setInputList([]);
        setPatinetId(e.target.value);
        fetchAdmitedPatientDetail(e.target.value);
    }
    const fetchAdmitedPatientDetail = async (patientId) => {
        const patient_id = encodeURIComponent(patientId);
        const data = await fetch(`http://localhost:4000/api/doctor/admited-patient-medi-info/${patient_id}`);
        const admited_patient_info = await data.json();
        if (admited_patient_info) {
            const detail = [];
            admited_patient_info.detail.map(function (item) {
                detail.push({
                    medicine: item.medicine,
                    cost: item.cost
                });
            });
            setInputList([...detail]);
        }
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
                                <h1 className="m-0 text-dark">Admited Patient info</h1>
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
                                                        <div className="col-sm-12">
                                                            <label>Patient</label> <select name="patient" onChange={e => patientChange(e)} className="form-control">
                                                                <option value>Select patient</option>
                                                                {
                                                                    patients.map(function (patient) {
                                                                        return <option value={patient._id}>{patient.name}</option>;
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="col-sm-6">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Room Fee's</label> <input type="number" className="form-control" name="fee" value="5000" readOnly={true} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="col-sm-12">
                                                            <label>Medicine</label>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Cost</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {inputList.map((x, i) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="medicine"
                                                                        value={x.medicine}
                                                                        onChange={e => handleInputChange(e, i)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <br></br>
                                                            <div className="col-sm-4">
                                                                <div className="form-group">
                                                                    <div className="col-sm-12">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            value={x.cost}
                                                                            onChange={e => handleInputChange(e, i)}
                                                                            name="cost"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="form-group">
                                                                    <div className="col-sm-12">
                                                                        {inputList.length !== 1 && <button
                                                                            className="mr10"
                                                                            onClick={() => handleRemoveClick(i)}
                                                                            className="btn btn-danger">Remove</button>}
                                                                        {inputList.length - 1 === i && <button className="btn btn-primary" onClick={handleAddClick}>Add</button>}
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    );
                                                })}

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

export default AdmitedPatientPage;