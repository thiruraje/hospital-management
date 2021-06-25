import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { doctorLogout } from '../../../action/doctorAction';

function Menu(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const doctorSigin = useSelector(state => state.doctorSignin);
  const { loading, doctorInfo, error } = doctorSigin;

  const mySubmitHandler = (event) => {
    event.preventDefault();
    dispatch(doctorLogout());
    history.push("/");
  }
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="" className="brand-link">
          <span className="brand-text font-weight-light">HospoManage</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="" className="d-block">Doctor : {doctorInfo.name}</a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/home">
                  <i className="nav-icon fas fa-th" />
                  Dashboard</Link>
              </li>
              <li className="nav-item has-treeview">
                <a className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Patient Part
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctor/addPatient">
                      <i className="nav-icon fas fa-th" />
                      Add</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctor/viewPatient">
                      <i className="nav-icon fas fa-th" />
                      View</Link>
                  </li>

                </ul>
              </li>
              <li className="nav-header">Check Up Entry</li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/regular-checkup">
                  <i className="nav-icon fas fa-th" />
                  RegularPatient </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/admited-patient-checkup">
                  <i className="nav-icon fas fa-th" />
                  AdmitedPatient </Link>
              </li>

              <li className="nav-header">------</li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/bill">
                  <i className="nav-icon fas fa-th" />
                  Patients bill</Link>
              </li>
              <form onSubmit={mySubmitHandler}>
                <button type="submit" className="btn btn-info">Doctor Logout</button>
              </form>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>

  );
}

export default Menu;