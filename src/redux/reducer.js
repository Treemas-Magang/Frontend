/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
import { combineReducers } from "redux";

const initialStateLogin = {
    title: 'Login Page',
    isLogin: true,
    form:{
        nik: '',
        password: '',
        deviceId: '',
    }
}
const LoginReducer = (state = initialStateLogin, action) => {
    if(action.type === 'SET_FORM'){
        return{
            ...state,
            form: {
                ...state.form,
                [action.inputType]: action.inputValue
            }
        }
    }
    return state
}

const initialStateSplash = {
    location: {
        latitude: null,
        longitude: null,
        accuracy: null
    },
    app:{
        version: ''
    },
    isLoading: true
}

const SplashReducer = (state = initialStateSplash, action) => {
    if (action.type === 'SET_LOCATION') {
        return{
            ...state,
            location:{
                ...state.location,
                latitude: action.latitude,
                longitude: action.longitude,
                accuracy: action.accuracy
            }
        }
    }
    if (action.type === 'SET_APP_VERSION') {
        return{
            ...state.app,
            app:{
                version: action.version
            }
        }
    }
    return state
}
const initialStateTimesheet = {
    form: {
        keterangan: ''
    }
}
const TimesheetReducer = (state = initialStateTimesheet, action) => {
    if (action.type === 'SET_FORM_UPDATE_TIMESHEET') {
        return{
            ...state,
            form: {
                ...state.form,
                [action.inputType]: action.inputValue
            }
        }
    }
    return state
}

const initialStateCheckBiometricType = {
    biometricType: null
}
const CheckBiometricTypeReducer = (state = initialStateCheckBiometricType, action) => {
    if (action.type === 'SET_BIOMETRIC_TYPE') {
        return{
            ...state,
            biometricType: action.biometricType
        }
    }
    return state
}

const initialStateUser = {
  data: [],
  error: null,
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case 'FETCH_DATA_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_DATA_USER_FAILURE':
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// const initialStateUser = {
//     biometricType: null
// }
// const userReducer = (state = initialStateUser, action) => {
//     if (action.type === 'SET_BIOMETRIC_TYPE') {
//         return{
//             ...state,
//             biometricType: action.biometricType
//         }
//     }
//     return state
// }

const initialStateCatatanKerja = {
    form: {
        timesheet: '',
        catatanPulangKerja: '',
    }
}
const CatatanKerjaReducer = (state = initialStateCatatanKerja, action) => {
    if (action.type === 'SET_FORM_CATATAN_KERJA') {
        return{
            ...state,
            form: {
                ...state.form,
                [action.inputType]: action.inputValue
            }
        }
    }
    return state
}


const reducer = combineReducers({
    LoginReducer,
    SplashReducer,
    TimesheetReducer,
    CheckBiometricTypeReducer,
    userReducer,
    CatatanKerjaReducer
})

export default reducer;