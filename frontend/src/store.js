import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';


import {
  adminSigninReducer,
  addDoctorReducer,
  addRoomReducer
} from './reducers/adminReducer';


import {
  accountantSigninReducer
} from './reducers/accountantReducer';

import {
  doctorSigninReducer,
  addPatientReducer,
  addRegularPatinetReducer,
  addAdmitedPatinetReducer
} from './reducers/doctorReducer';

const adminInfo = Cookie.getJSON('adminInfo') || null;
const accountantInfo = Cookie.getJSON('accountantInfo') || null;
const doctorInfo = Cookie.getJSON('doctorInfo') || null;


const initialState = {
  doctorSignin: { doctorInfo },
  adminSignin: { adminInfo },
  accountantSignin: { accountantInfo },
};

const reducer = combineReducers({
  
  adminSignin: adminSigninReducer,
  addDoctor: addDoctorReducer,
  addRoom:addRoomReducer,
  doctorSignin:doctorSigninReducer,
  addPatient:addPatientReducer,
  regularPatientCheckup:addRegularPatinetReducer,
  admitedPatientCheckup:addAdmitedPatinetReducer,
  accountantSignin:accountantSigninReducer
 
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
