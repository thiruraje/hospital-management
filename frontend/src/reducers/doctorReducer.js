import {
    DOCTOR_SIGNIN_REQUEST,
    DOCTOR_SIGNIN_SUCCESS,
    DOCTOR_SIGNIN_FAIL,
    DOCTOR_LOGOUT,
    PATIENT_ADD_REQUEST,
    PATIENT_ADD_SUCCESS,
    PATIENT_ADD_FAIL,
    CHECKUP_ADD_REQUEST,
    CHECKUP_ADD_SUCCESS,
    CHECKUP_ADD_FAIL,

} from "../constants/Constants";


function doctorSigninReducer(state = {}, action) {
    switch (action.type) {
        case DOCTOR_SIGNIN_REQUEST:
            return { loading: true };
        case DOCTOR_SIGNIN_SUCCESS:
            return { loading: false, doctorInfo: action.payload };
        case DOCTOR_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case DOCTOR_LOGOUT:
            return {};
        default: return state;
    }
}

function addPatientReducer(state = {}, action) {
    switch (action.type) {
      case PATIENT_ADD_REQUEST:
        return { loading: true };
      case PATIENT_ADD_SUCCESS:
        return { loading: false, insert:action.payload };
      case PATIENT_ADD_FAIL:
        return { loading: false, insert:false  };
      default: return state;
    }
  }

  function addCheckupReducer(state = {}, action) {
    switch (action.type) {
      case CHECKUP_ADD_REQUEST:
        return { loading: true };
      case CHECKUP_ADD_SUCCESS:
        return { loading: false, insert:action.payload };
      case CHECKUP_ADD_FAIL:
        return { loading: false, insert:false  };
      default: return state;
    }
  }
export {
    doctorSigninReducer,
    addPatientReducer,
    addCheckupReducer
}