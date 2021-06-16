import React from 'react'

import DoctorPage from './doctor/DoctorPage'
import RoomPage from './room/RoomPage'
import DashboardPage from './DashboardPage'




const routes = [
    { path: '/admin/addDoctor', name: 'Doctor', component: DoctorPage },
    { path: '/admin/dashboard', name: 'Dashboard', component: DashboardPage },
    { path: '/admin/addRooms', name: 'Rooms', component: RoomPage },
]

export default routes
