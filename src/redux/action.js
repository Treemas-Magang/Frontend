/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
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

// export const setDataUserAPI = (payload) => {
//   return { type: 'FETCH_DATA_USER_SUCCESS', payload: payload };
// }
// export const fetchDataUserError = (error) => {
//     return{ type: 'FETCH_DATA_USER_FAILURE', error}
// }

export const setDataUserAPI = (data) => {
  return {
    type: 'FETCH_DATA_USER_SUCCESS',
    payload: data,
  };
};

export const fetchDataUserError = (error) => {
  return {
    type: 'FETCH_DATA_USER_FAILURE',
    payload: error,
  };
};

export const setFormCatatanKerja = (inputType, value) => {
    return{type: 'SET_FORM_CATATAN_KERJA', inputType: inputType, inputValue: value}
}
export const setFormCuti = (inputType, value) => {
    return{type: 'SET_FORM_CUTI', inputType: inputType, inputValue: value}
}