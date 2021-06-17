import Cookie from 'js-cookie';

import { 
    ADMIN_SIGNIN_REQUEST, 
    ADMIN_SIGNIN_SUCCESS, 
    ADMIN_SIGNIN_FAIL, 
    ADMIN_REGISTER_REQUEST, 
    ADMIN_REGISTER_SUCCESS, 
    ADMIN_REGISTER_FAIL, 
    ADMIN_LOGOUT, 
    ADMIN_UPDATE_REQUEST, 
    ADMIN_UPDATE_SUCCESS, 
    ADMIN_UPDATE_FAIL 
} from "../constants/adminConstants";
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
export { signin };