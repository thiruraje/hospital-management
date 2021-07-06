import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';



function HomePage(props) {
   
    return (
        <div class="wrapper">
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <h1 className="m-0 text-dark">Dashboard</h1>
                    </div>
                </div>
                <br></br>
                
            </div>
            <Footer />
        </div>
    );
}
export default HomePage;