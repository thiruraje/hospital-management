import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminLogout } from '../../../action/adminAction';
import { useHistory } from "react-router-dom";


function Menu(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const adminSignin = useSelector(state => state.adminSignin);
  const { loading, adminInfo, error } = adminSignin;

  const mySubmitHandler = (event) => {
    event.preventDefault();
    dispatch(adminLogout());
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
              <a href="" className="d-block">Admin : {adminInfo.name}</a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/home">
                  <i className="nav-icon fas fa-th" />
                  Dashboard</Link>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Doctor Part
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/addDoctor">
                      <i className="nav-icon fas fa-th" />
                      Add</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewDoctor">
                      <i className="nav-icon fas fa-th" />
                      View</Link>
                  </li>

                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Rooms Part
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/addRooms">
                      <i className="nav-icon fas fa-th" />
                      Add</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewRooms">
                      <i className="nav-icon fas fa-th" />
                      View</Link>
                  </li>

                </ul>
              </li>
              <li className="nav-header">------</li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/register">
                  <i className="nav-icon fas fa-th" />
                  Patients bill</Link>
              </li>
              <li className="nav-item">
                <form onSubmit={mySubmitHandler}>
                  <button type="submit" className="btn btn-info">Admin Logout</button>
                </form>

              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>

  )
}


export default Menu;