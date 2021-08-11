import Cookie from 'js-cookie';

import {
    DOCTOR_SIGNIN_REQUEST,
    DOCTOR_SIGNIN_SUCCESS,
    DOCTOR_SIGNIN_FAIL,
    DOCTOR_LOGOUT,
    PATIENT_ADD_REQUEST,
    PATIENT_ADD_SUCCESS,
    PATIENT_ADD_FAIL,
    REGULAR_CHECKUP_ADD_REQUEST,
    REGULAR_CHECKUP_ADD_SUCCESS,
    REGULAR_CHECKUP_ADD_FAIL,
    ADMITED_CHECKUP_ADD_REQUEST,
    ADMITED_CHECKUP_ADD_SUCCESS,
    ADMITED_CHECKUP_ADD_FAIL,

} from "../constants/Constants";

const Axios = require('axios');

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: DOCTOR_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("http://localhost:4000/api/doctor/signin", { email, password });
        dispatch({ type: DOCTOR_SIGNIN_SUCCESS, payload: data });
        Cookie.set('doctorInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: DOCTOR_SIGNIN_FAIL, payload: error.message });
    }
}

const addPatient = (name, age, mobile, gender, heigth, weigth, address, condition, admitedRoonNo) => async (dispatch, getState) => {
    dispatch({ type: PATIENT_ADD_REQUEST });
    try {
        const { doctorSignin: { doctorInfo } } = getState();
        const doctor_id = doctorInfo._id;
        await Axios.post("http://localhost:4000/api/doctor/createpatient", { doctor_id, name, age, mobile, gender, heigth, weigth, address, condition, admitedRoonNo });
        dispatch({ type: PATIENT_ADD_SUCCESS, payload: true });

    } catch (error) {
        dispatch({ type: PATIENT_ADD_FAIL, payload: error.message });
    }
}

const addRegularPatientCheckup = (patientId, inputList) => async (dispatch, getState) => {

    dispatch({ type: REGULAR_CHECKUP_ADD_REQUEST });
    try {
        await Axios.post("http://localhost:4000/api/doctor/regular-patient", { patientId, inputList });
        dispatch({ type: REGULAR_CHECKUP_ADD_SUCCESS, payload: true });

    } catch (error) {
        dispatch({ type: REGULAR_CHECKUP_ADD_FAIL, payload: error.message });
    }
}

const addAdmitedPatientCheckup = (patientId,fee, inputList) => async (dispatch, getState) => {
    dispatch({ type: ADMITED_CHECKUP_ADD_REQUEST });
    try {
        await Axios.post("http://localhost:4000/api/doctor/admited-patient", { patientId,fee, inputList });
        dispatch({ type: ADMITED_CHECKUP_ADD_SUCCESS, payload: true });
    } catch (error) {
        dispatch({ type: ADMITED_CHECKUP_ADD_FAIL, payload: error.message });
    }
}


const discharge = (patientId) => async (dispatch, getState) => {
    console.log(patientId)
    try {
        await Axios.post("http://localhost:4000/api/doctor/admited-patient-discharge", { patientId });
    } catch (error) {
        console.log(error)
    }
}


const doctorLogout = () => (dispatch) => {
    Cookie.remove("doctorInfo");
    dispatch({ type: DOCTOR_LOGOUT })
}

export { signin, doctorLogout, addPatient, addRegularPatientCheckup ,addAdmitedPatientCheckup , discharge};