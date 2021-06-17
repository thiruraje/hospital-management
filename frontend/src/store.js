import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';


import {
  adminSigninReducer,
  addDoctorReducer,
  addRoomReducer
} from './reducers/adminReducer';

const adminInfo = Cookie.getJSON('adminInfo') || null;
const doctorInfo = Cookie.getJSON('doctorInfo') || null;


const initialState = {
  adminSignin: { adminInfo },
  doctorInfo: { doctorInfo },
};
const reducer = combineReducers({
  adminSignin: adminSigninReducer,
  addDoctor: addDoctorReducer,
  addRoom:addRoomReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
