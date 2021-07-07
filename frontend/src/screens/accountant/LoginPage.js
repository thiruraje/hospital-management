

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../action/accountantAction';


function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const accountantSignin = useSelector(state => state.accountantSignin);
    const { loading, accountantInfo, error } = accountantSignin;

    useEffect(() => {
        if (accountantInfo) {
            props.history.push('/accountant/home');
        }
        return () => {
            //
        };
    }, [accountantInfo,error]);

    const mySubmitHandler = (event) => {
        event.preventDefault();
        dispatch(signin(email, password));
        
    }
    

    return <div>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={mySubmitHandler}>
                    <h3>Sign In</h3>
                    <div className="form-group ">
                        <label>Email address</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"  required/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    </div>
}

export default LoginPage;