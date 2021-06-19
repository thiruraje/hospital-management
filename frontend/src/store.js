import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';


import {
  adminSigninReducer,
  addDoctorReducer,
  addRoomReducer
} from './reducers/adminReducer';

import {
  doctorSigninReducer,
  addPatientReducer,
  addCheckupReducer
} from './reducers/doctorReducer';

const adminInfo = Cookie.getJSON('adminInfo') || null;
const doctorInfo = Cookie.getJSON('doctorInfo') || null;


const initialState = {
  doctorSignin: { doctorInfo },
  adminSignin: { adminInfo },
};
const reducer = combineReducers({
  
  adminSignin: adminSigninReducer,
  addDoctor: addDoctorReducer,
  addRoom:addRoomReducer,
  doctorSignin:doctorSigninReducer,
  addPatient:addPatientReducer,
  checkupDetail:addCheckupReducer
 
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
