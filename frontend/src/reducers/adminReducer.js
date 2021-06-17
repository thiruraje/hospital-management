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


function adminSigninReducer(state = {}, action) {
    switch (action.type) {
      case ADMIN_SIGNIN_REQUEST:
        return { loading: true };
      case ADMIN_SIGNIN_SUCCESS:
        return { loading: false, adminInfo: action.payload };
      case ADMIN_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case ADMIN_LOGOUT:
        return {};
      default: return state;
    }
  }

  export {
    adminSigninReducer
  }