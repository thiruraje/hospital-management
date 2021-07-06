import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logout } from '../../../action/accountantAction';
import { useHistory } from "react-router-dom";


function Menu(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const accountantSignin = useSelector(state => state.accountantSignin);
  const { loading, accountantInfo, error } = accountantSignin;

  const mySubmitHandler = (event) => {
    event.preventDefault();
    dispatch(Logout());
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
              <a href="" className="d-block">Accountant : {accountantInfo.name}</a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/home">
                  <i className="nav-icon fas fa-th" />
                  Dashboard </Link>
              </li>
              <li className="nav-header">Patients</li>
              <li className="nav-item">
                <Link className="nav-link" to="/accountant/daily-patient">
                  <i className="nav-icon fas fa-th" />
                  Daily  Patients</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/accountant/admited-patient">
                  <i className="nav-icon fas fa-th" />
                  Admit Patient</Link>
              </li>
              <li></li>
              <li className="nav-item">
                <form onSubmit={mySubmitHandler}>
                  <button type="submit" className="btn btn-info">Acc Logout</button>
                </form>
              </li>
              
            </ul>
          </nav>
        </div>
      </aside>
    </div>

  )
}


export default Menu;