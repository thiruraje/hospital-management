import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

function RoomListPage(props) {
    useEffect(() => {
        fetchRooms();
    }, []);

    const [rooms, setItems] = useState([]);

    const fetchRooms = async () => {
        const data = await fetch('http://localhost:4000/api/admin/rooms');
        const rooms = await data.json();
        setItems(rooms);
    };
    return (
        <div>
            <Header />
            <Menu />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">View Rooms</h1>
                            </div>{/* /.col */}

                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>


                <section className="content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Room No</th>
                                <th scope="col">Floor</th>
                                <th scope="col">isOccupied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rooms.map(room => (
                                    <tr key={room._id}>
                                        <td>#</td>
                                        <td>{room.no}</td>
                                        <td>{room.floor}</td>
                                        <td>{room.is_occupied ?"yes" : "No"}</td>


                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


                </section>
                {/* /.content */}
            </div>
            <Footer />

        </div>

    );
}


export default RoomListPage;