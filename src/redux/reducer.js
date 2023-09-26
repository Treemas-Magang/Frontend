import { combineReducers } from "redux";

const initialStateLogin = {
    title: 'Login Page',
    isLogin: true,
    form:{
        nik: '',
        password: '',
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
const initialStateTimesheet ={
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

const reducer = combineReducers({
    LoginReducer,
    SplashReducer,
    TimesheetReducer,
    CheckBiometricTypeReducer
})

export default reducer;