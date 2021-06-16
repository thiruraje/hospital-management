import React from 'react';

class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div class="flex-center position-ref full-height">
                    <div class="top-right links">
                        <a href="/admin/login">Admin</a>
                        <a href="/doctor/login">Doctor</a>
                    </div>
                    <div class="content">
                        <div class="title m-b-md">
                            Hospital Management
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Intro;