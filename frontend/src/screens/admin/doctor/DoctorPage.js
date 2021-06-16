import React from 'react';
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

class DoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Header />
                <Menu />

                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Add Doctor</h1>
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
                                            <form className="form-horizontal">
                                                <div className="box-body">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Name</label> <input type="text" className="form-control" name="Doctor_name" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Mobile</label> <input type="text" className="form-control" name="Doctor_mobile" required />
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Email</label> <input type="email" className="form-control" name="Doctor_email" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Address</label> <input type="text" className="form-control" name="Doctor_add" required />
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>State</label> <input type="text" className="form-control" name="Doctor_state" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Country</label> <input type="text" className="form-control" name="Doctor_country" required />
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Gender</label> <select name="gender" className="form-control">
                                                                        <option value>Select Gender</option>
                                                                        <option>Male</option>
                                                                        <option>Female</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <label>Doctor Type</label> <select name="gender" className="form-control">
                                                                        <option value>Select Type</option>
                                                                        <option>Cardiologist</option>
                                                                        <option>Audiologist</option>
                                                                        <option>Dentist</option>
                                                                        <option>Gynaecologist</option>
                                                                        <option>Orthopaedic surgeon</option>
                                                                        <option>Paediatrician</option>
                                                                        <option>Psychiatrists</option>
                                                                        <option>Veterinarian</option>
                                                                        <option>Radiologist</option>
                                                                        <option>Pulmonologist</option>
                                                                    </select>
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
}

export default DoctorPage;