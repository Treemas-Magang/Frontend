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
const initialStateLoginFingerPrint = {
    title: 'Login Page',
    isLogin: true,
    formLogin:{
        nik: '',
        password: '',
        deviceId: '',
    }
}
const LoginFingerPrintReducer = (state = initialStateLoginFingerPrint, action) => {
    if(action.type === 'SET_FORM_LOGIN_FINGERPRINT'){
        return{
            ...state,
            formLogin: {
                ...state.formLogin,
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
const initialStateFormCuti = {
    form: {
        nik: '',
        jenis_cuti: '',
        tanggal_cuti: '',
        tanggal_selesai: '',
        tanggal_masuk: '',
        jml_cuti: '',
        keperluan_cuti: '',
        alamat_cuti: ''
    }
}
const FormCutiReducer = (state = initialStateFormCuti, action) => {
    if (action.type === 'SET_FORM_CUTI') {
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
const initialStateFormSakit = {
    form: {
        nik: '',
        tanggal_sakit: '',
        tanggal_selesai: '',
        tanggal_masuk: '',
        jml_sakit: '',
        alasan: '',
        foto: {}
    }
}
const FormSakitReducer = (state = initialStateFormSakit, action) => {
    if (action.type === 'SET_FORM_SAKIT') {
        return{
            ...state,
            form: {
                ...state.form,
                [action.inputType]: action.inputValue
            },
        }
    }
    return state
}

const initialStateAbsensi = {
    form: {
        nik: '',
        lokasi_project: '',
        waktu: '',
        lokasi: '',
        jarak: 0,
        alasan_telat_masuk: '',
        foto: {}
    }
}
const FormAbsensiReducer = (state = initialStateAbsensi, action) => {
    if (action.type === 'SET_FORM_ABSENSI') {
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
const initialStateClaim = {
    form: {
        nik: '',
        type: '',
        keterangan: '',
        nominal: 0,
        foto: {}
    }
}
const FormClaimReducer = (state = initialStateClaim, action) => {
    if (action.type === 'SET_FORM_CLAIM') {
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

const initialStateDetailApproval = {
    form: {
        catatanApproval: '',
    }
}
const CatatanApprovalReducer = (state = initialStateDetailApproval, action) => {
    if (action.type === 'SET_FORM_CATATAN_APPROVAL') {
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
    CatatanKerjaReducer,
    FormCutiReducer,
    FormSakitReducer,
    FormAbsensiReducer,
    FormClaimReducer,
    CatatanApprovalReducer,
    LoginFingerPrintReducer,
})

export default reducer;