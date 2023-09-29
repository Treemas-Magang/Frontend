/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
import axios from 'axios';
export const setForm = (inputType, value) =>{
    return{type: 'SET_FORM', inputType: inputType, inputValue: value}
}

export const setLocation = (latitude, longitude, accuracy) => {
    return{type: 'SET_LOCATION', latitude: latitude, longitude: longitude, accuracy: accuracy}
}

export const setAppVersion = (version) => {
    return{type: 'SET_APP_VERSION', version: version}
}

export const setFormTimesheet = (inputType, value) => {
    return{type: 'SET_FORM_UPDATE_TIMESHEET', inputType: inputType, inputValue: value}
}
export const setBiometricType =  value => {
    return{type: 'SET_BIOMETRIC_TYPE', biometricType: value}
}

// export const fetchData = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get('http://localhost:3004/user');
//       const data = response.data;
//       dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
//     } catch (error) {
//       dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
//     }
//   };
// };
export const setDataUserAPI = (payload) => {
  return { type: 'FETCH_DATA_USER_SUCCESS', payload };
}
export const fetchDataUserError = (error) => {
    return{ type: 'FETCH_DATA_USER_FAILURE', error}
}