import {
    ACCOUNTANT_SIGNIN_REQUEST,
    ACCOUNTANT_SIGNIN_SUCCESS,
    ACCOUNTANT_SIGNIN_FAIL,
    ACCOUNTANT_LOGOUT,


} from "../constants/Constants";

function accountantSigninReducer(state = {}, action) {
    switch (action.type) {
        case ACCOUNTANT_SIGNIN_REQUEST:
            return { loading: true };
        case ACCOUNTANT_SIGNIN_SUCCESS:
            return { loading: false, accountantInfo: action.payload };
        case ACCOUNTANT_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case ACCOUNTANT_LOGOUT:
            return {};
        default: return state;
    }
}
export {accountantSigninReducer}