import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function RegisterPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(register(name, email, password));
      }

    return (
        <div>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={submitHandler}>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" onChange={(e) => setName(e.target.value)}
                                className="form-control" placeholder="First name" />
                        </div>



                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label>Re-Password</label>
                            <input type="password" name="rePassword" onChange={(e) => setRePassword(e.target.value)} className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        </div >


    );

}


export default RegisterPage;