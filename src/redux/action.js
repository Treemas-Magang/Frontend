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