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

  function addDoctorReducer(state = {}, action) {
    switch (action.type) {
      case DOCTOR_ADD_REQUEST:
        return { loading: true };
      case DOCTOR_ADD_SUCCESS:
        return { loading: false, insert:action.payload };
      case DOCTOR_ADD_FAIL:
        return { loading: false, insert:false  };
      default: return state;
    }
  }

  function addRoomReducer(state = {}, action) {
    switch (action.type) {
      case  ROOM_ADD_REQUEST:
        return { loading: true };
      case  ROOM_ADD_SUCCESS:
        return { loading: false, insert:action.payload };
      case  ROOM_ADD_FAIL:
        return { loading: false, insert:false  };
      default: return state;
    }
  }





  export {
    adminSigninReducer,
    addDoctorReducer,
    addRoomReducer
  }