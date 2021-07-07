import Cookie from 'js-cookie';

import {
    ACCOUNTANT_SIGNIN_REQUEST,
    ACCOUNTANT_SIGNIN_SUCCESS,
    ACCOUNTANT_SIGNIN_FAIL,
    ACCOUNTANT_LOGOUT,


} from "../constants/Constants";

const Axios = require('axios');

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: ACCOUNTANT_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("http://localhost:4000/api/accountant/signin", { email, password });
        dispatch({ type: ACCOUNTANT_SIGNIN_SUCCESS, payload: data });
        Cookie.set('accountantInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: ACCOUNTANT_SIGNIN_FAIL, payload: error.message });
    }
}

const Logout = () => (dispatch) => {
    Cookie.remove("accountantInfo");
    dispatch({ type: ACCOUNTANT_LOGOUT })
}

export { signin, Logout };