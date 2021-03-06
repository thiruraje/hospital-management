import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import { addRoom } from '../../../action/adminAction';

import { useSelector, useDispatch } from 'react-redux';


function RoomPage(props) {
    const dispatch = useDispatch();
    const [no, setNo] = useState('');
    const [floor, setFloor] = useState('');
    const mySubmitHandler = (event) => {
        event.preventDefault();
        dispatch(addRoom(
            no,
            floor,
            ));
        props.history.push('/admin/viewRooms');
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
                                <h1 className="m-0 text-dark">Add Rooms</h1>
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
                                                                <label>Room No</label> <input type="text" className="form-control" name="no"onChange={(e) => setNo(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Floor</label> <input type="text" className="form-control" name="floor"onChange={(e) => setFloor(e.target.value)} required />
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


export default RoomPage;