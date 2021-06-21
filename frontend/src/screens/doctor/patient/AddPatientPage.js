import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addPatient } from '../../../action/doctorAction';

function AddPatientPage(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        fetchDatas();
    }, []);
    const [rooms, setRooms] = useState([]);
    const fetchDatas = async () => {
        var data = await fetch(`http://localhost:4000/api/doctor/availablerooms`);
        var datas = await data.json();
        setRooms(datas);
    };

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [heigth, setHeigth] = useState('');
    const [weigth, setWeigth] = useState('');
    const [address, setAddress] = useState('');
    const [condition, setCondition] = useState('');
    const [admitedRoonNo, setAdmitedRoom] = useState('');


    const [isSeriousCondition, setSeriousCondition] = useState(false);

    const mySubmitHandler = (event) => {
        event.preventDefault();
        if(isSeriousCondition){
            dispatch(addPatient(name, age, mobile, gender, heigth, weigth, address,condition,admitedRoonNo));
        }else{
            dispatch(addPatient(name, age, mobile, gender, heigth, weigth, address,condition,null));
        }
        props.history.push('/doctor/viewPatient');
    }
    return (
        <div>
            <Header />
            <Menu />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                    <h1 className="m-0 text-dark">Add Patient</h1>
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
                                                                <label>Name</label> <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Age</label> <input type="text" className="form-control" name="age" onChange={(e) => setAge(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Mobile</label> <input type="text" className="form-control" name="mobile" onChange={(e) => setMobile(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Gender</label> <select name="gender" required onChange={(e) => setGender(e.target.value)} className="form-control">
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
                                                                <label>Heigth</label> <input type="text" className="form-control" name="heigth" onChange={(e) => setHeigth(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Weigth</label> <input type="text" className="form-control" name="weigth" onChange={(e) => setWeigth(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Address</label> <input type="textarea" className="form-control" name="address" onChange={(e) => setAddress(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Patient Condition</label> <select name="condition" required
                                                                    onChange={(e) => {
                                                                        setCondition(e.target.value);
                                                                        if (e.target.value === "admit") {
                                                                            setSeriousCondition(true);
                                                                        } else {
                                                                            setSeriousCondition(false);
                                                                            setAdmitedRoom('');
                                                                        }
                                                                    }}
                                                                    className="form-control">
                                                                    <option value="">Select condition</option>
                                                                    <option value="normal">Normal Checkup</option>
                                                                    <option value="admit">Serious condition</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    (isSeriousCondition) ?
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <div className="col-sm-12">
                                                                        <label>Room</label> <select name="admitedRoonNo" required onChange={(e) => setAdmitedRoom(e.target.value)} className="form-control">
                                                                            <option value>Select room</option>
                                                                            {
                                                                                rooms.map(function (room) {
                                                                                    return <option value={room._id}>{room.no}</option>;
                                                                                })
                                                                            }

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : <div></div>
                                                }

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