

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../action/adminAction';


function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const adminSignin = useSelector(state => state.adminSignin);
    const { loading, adminInfo, error } = adminSignin;

    useEffect(() => {
        if (adminInfo) {
            props.history.push('/admin/home');
        }
        return () => {
            //
        };
    }, [adminInfo]);

    const mySubmitHandler = (event) => {
        event.preventDefault();
        dispatch(signin(email, password));
    }

    return <div>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={mySubmitHandler}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>

                </form>
            </div>
        </div>
    </div>
}

export default LoginPage;