import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRegularPatientCheckup } from '../../action/doctorAction';
import { useHistory } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function RegularCheckPage(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const doctorSigin = useSelector(state => state.doctorSignin);
    const { loading, doctorInfo, error } = doctorSigin;


    useEffect(() => {
        fetchPatients();
    }, []);

    const [patients, setPatinet] = useState([]);
    const [patientId, setPatinetId] = useState([]);

    const [inputList, setInputList] = useState([{ problem: "", solution: "" }]);

    const fetchPatients = async () => {
        const doctor_id = encodeURIComponent(doctorInfo._id);
        const data = await fetch(`http://localhost:4000/api/doctor/regular-patients/${doctor_id}`);
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
        setInputList([...inputList, { problem: "", solution: "" }]);
    };
    const mySubmitHandler = (event) => {
        event.preventDefault();
        dispatch(addRegularPatientCheckup(patientId, inputList));
        history.push('/doctor/viewPatient');
    }
    const patientChange = (event, value) =>{
        if(value != null){
            setPatinetId(value._id);
        }
       
    }
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
                                <h1 className="m-0 text-dark">Regular Checkup</h1>
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
                                                        <label>Patient</label>
                                                        <Autocomplete
                                                            id="Select patient"
                                                            options={patients}
                                                            getOptionLabel={(option) => option.name}
                                                            onChange={patientChange}
                                                            style = {{ height : 50}}
                                                            renderInput={(params) => <TextField {...params} size="small" label="Select Patient" variant="outlined" />}
                                                        />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <br></br>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="col-sm-12">
                                                            <label>Problem</label>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Solution</label>
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
                                                                        name="patient_age"
                                                                        name="problem"
                                                                        value={x.problem}
                                                                        onChange={e => handleInputChange(e, i)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <br></br>
                                                            <div className="col-sm-4">
                                                                <div className="form-group">
                                                                    <div className="col-sm-12">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={x.solution}
                                                                            onChange={e => handleInputChange(e, i)}
                                                                            name="solution"
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

export default RegularCheckPage;