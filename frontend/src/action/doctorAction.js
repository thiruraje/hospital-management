import Cookie from 'js-cookie';

import { 
    DOCTOR_SIGNIN_REQUEST, 
    DOCTOR_SIGNIN_SUCCESS, 
    DOCTOR_SIGNIN_FAIL, 
    DOCTOR_LOGOUT,
    PATIENT_ADD_REQUEST,
    PATIENT_ADD_SUCCESS,
    PATIENT_ADD_FAIL,
    


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

const addPatient = (name,age,mobile,gender,heigth,weigth,temperature,address) => async (dispatch) => {
    dispatch({ type:PATIENT_ADD_REQUEST });
    try {
        await Axios.post("http://localhost:4000/api/doctor/createpatient", { name,age,mobile,gender,heigth,weigth,temperature,address});
        dispatch({ type:PATIENT_ADD_SUCCESS, payload: true });

    } catch (error) {
        dispatch({ type:PATIENT_ADD_FAIL, payload: error.message });
    }
}


const doctorLogout = () => (dispatch) => {
    Cookie.remove("doctorInfo");
    dispatch({ type: DOCTOR_LOGOUT })
  }

export { signin,doctorLogout,addPatient };