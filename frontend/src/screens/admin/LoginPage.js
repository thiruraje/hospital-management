

import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        this.props.history.push('/admin/home');
    }
    render() {
        return (
            <div>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.mySubmitHandler}>
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            <p className="forgot-password text-right">
                                <Link to="/admin/register">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;