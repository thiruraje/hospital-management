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
      return { loading: false, insert: action.payload };
    case PATIENT_ADD_FAIL:
      return { loading: false, insert: false };
    default: return state;
  }
}

function addRegularPatinetReducer(state = {}, action) {
  switch (action.type) {
    case REGULAR_CHECKUP_ADD_REQUEST:
      return { loading: true };
    case REGULAR_CHECKUP_ADD_SUCCESS:
      return { loading: false, insert: action.payload };
    case REGULAR_CHECKUP_ADD_FAIL:
      return { loading: false, insert: false };
    default: return state;
  }
}
function addAdmitedPatinetReducer(state = {}, action) {
  switch (action.type) {
    case ADMITED_CHECKUP_ADD_REQUEST:
      return { loading: true };
    case ADMITED_CHECKUP_ADD_SUCCESS:
      return { loading: false, insert: action.payload };
    case ADMITED_CHECKUP_ADD_FAIL:
      return { loading: false, insert: false };
    default: return state;
  }
}
export {
  doctorSigninReducer,
  addPatientReducer,
  addRegularPatinetReducer,
  addAdmitedPatinetReducer
}