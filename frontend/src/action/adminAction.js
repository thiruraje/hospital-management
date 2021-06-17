import Cookie from 'js-cookie';

import {
    ADMIN_SIGNIN_REQUEST,
    ADMIN_SIGNIN_SUCCESS,
    ADMIN_SIGNIN_FAIL,
    ADMIN_LOGOUT,
    DOCTOR_ADD_REQUEST,
    DOCTOR_ADD_SUCCESS,
    DOCTOR_ADD_FAIL,
    ROOM_ADD_REQUEST,
    ROOM_ADD_SUCCESS,
    ROOM_ADD_FAIL,

} from "../constants/Constants";
const Axios = require('axios');

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("http://localhost:4000/api/admin/signin", { email, password });
        dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
        Cookie.set('adminInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.message });
    }
}

const addDoctor = (name, mobile, email, address, state, country, gender, type) => async (dispatch) => {
    dispatch({ type: DOCTOR_ADD_REQUEST, payload: { name, mobile, email, address, state, country, gender, type } });
    try {
        await Axios.post("http://localhost:4000/api/admin/createdoctor", { name, mobile, email, address, state, country, gender, type });
        dispatch({ type: DOCTOR_ADD_SUCCESS, payload: true });

    } catch (error) {
        dispatch({ type: DOCTOR_ADD_FAIL, payload: error.message });
    }
}

const addRoom = (no, floor, type, bed_count) => async (dispatch) => {
    dispatch({ type: ROOM_ADD_REQUEST, payload: { no, floor, type, bed_count } });
    try {
        await Axios.post("http://localhost:4000/api/admin/createroom", { no, floor, type, bed_count });
        dispatch({ type: ROOM_ADD_SUCCESS, payload: true });

    } catch (error) {
        dispatch({ type: ROOM_ADD_FAIL, payload: error.message });
    }
}

const adminLogout = () => (dispatch) => {
    Cookie.remove("adminInfo");
    dispatch({ type: ADMIN_LOGOUT })
}



export { signin, addDoctor, addRoom, adminLogout };