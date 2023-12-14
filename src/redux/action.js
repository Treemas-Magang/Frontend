/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
export const setForm = (inputType, value) => {
  return {type: 'SET_FORM', inputType: inputType, inputValue: value};
};
export const setFormLoginFingerPrint = (inputType, value) => {
  return {
    type: 'SET_FORM_LOGIN_FINGERPRINT',
    inputType: inputType,
    inputValue: value,
  };
};

export const setLocation = (latitude, longitude, accuracy) => {
  return {
    type: 'SET_LOCATION',
    latitude: latitude,
    longitude: longitude,
    accuracy: accuracy,
  };
};

export const setAppVersion = version => {
  return {type: 'SET_APP_VERSION', version: version};
};

export const setFormTimesheet = (inputType, value) => {
  return {
    type: 'SET_FORM_UPDATE_TIMESHEET',
    inputType: inputType,
    inputValue: value,
  };
};
export const setBiometricType = value => {
  return {type: 'SET_BIOMETRIC_TYPE', biometricType: value};
};

// export const setDataUserAPI = (payload) => {
//   return { type: 'FETCH_DATA_USER_SUCCESS', payload: payload };
// }
// export const fetchDataUserError = (error) => {
//     return{ type: 'FETCH_DATA_USER_FAILURE', error}
// }

export const setDataUserAPI = data => {
  return {
    type: 'FETCH_DATA_USER_SUCCESS',
    payload: data,
  };
};

export const fetchDataUserError = error => {
  return {
    type: 'FETCH_DATA_USER_FAILURE',
    payload: error,
  };
};

// export const setFormCatatanKerja = (inputType, value) => {
//   return {
//     type: 'SET_FORM_CATATAN_KERJA',
//     inputType: inputType,
//     inputValue: value,
//   };
// };
export const setFormCuti = (inputType, value) => {
  return {type: 'SET_FORM_CUTI', inputType: inputType, inputValue: value};
};
export const setFormSakit = (inputType, value) => {
  return {type: 'SET_FORM_SAKIT', inputType: inputType, inputValue: value};
};
export const resetFormSakit = () => {
  return {type: 'RESET_FORM_SAKIT'};
};
export const setFormAbsensi = (inputType, value) => {
  return {type: 'SET_FORM_ABSENSI', inputType: inputType, inputValue: value};
};
export const setFormClaim = (inputType, value) => {
  return {type: 'SET_FORM_CLAIM', inputType: inputType, inputValue: value};
};
// export const resetFormClaim = () => {
//   return {type: 'RESET_FORM_CLAIM'};
// };
export const setFormApproval = (inputType, value) => {
  return {
    type: 'SET_FORM_CATATAN_APPROVAL',
    inputType: inputType,
    inputValue: value,
  };
};
export const setAbsenMasuk = (inputType, value) => {
  return {
    type: 'SET_FORM_ABSEN_MASUK',
    inputType: inputType,
    inputValue: value,
  };
};
export const setUpdateAbsen = (inputType, value) => {
  return {
    type: 'SET_FORM_UPDATE_ABSEN',
    inputType: inputType,
    inputValue: value,
  };
};
export const setAbsenPulang = (inputType, value) => {
  return {
    type: 'SET_FORM_ABSEN_PULANG',
    inputType: inputType,
    inputValue: value,
  };
};
export const setFormUpdatePassword = (inputType, value) => {
  return {
    type: 'SET_FORM_UPDATE_PASSWORD',
    inputType: inputType,
    inputValue: value,
  };
};
export const setJumlahPengumuman = (inputType, value) => {
  return {
    type: 'SET_JUMLAH_PENGUMUMAN',
    inputType: inputType,
    inputValue: value,
  };
};
export const setJumlahApproval = (inputType, value) => {
  return {
    type: 'SET_JUMLAH_APPROVAL',
    inputType: inputType,
    inputValue: value,
  };
};

export const setProjectYangDipilih = (inputType, value) => {
  return {
    type: 'SET_PROJECT_YANG_DIPILIH',
    inputType: inputType,
    inputValue: value,
  };
};
export const setIsWFH = (inputType, value) => {
  return {
    type: 'SET_IS_WFH',
    inputType: inputType,
    inputValue: value,
  };
};
export const setIsAbsen = (inputType, value) => {
  return {
    type: 'SET_IS_ABSEN',
    inputType: inputType,
    inputValue: value,
  };
};
export const setDataUser = (inputType, value) => {
  return {
    type: 'SET_DATA_USER',
    inputType: inputType,
    inputValue: value,
  };
};

export const setFormDetailProfile = (inputType, inputValue) => {
  return {
    type: 'SET_FORM_DETAIL_PROFILE',
    inputType,
    inputValue,
  };
};

export const resetFormDetailProfile = () => {
  return {
    type: 'RESET_FORM_DETAIL_PROFILE',
  };
};
export const setNotiveMasingMasingApproval = (inputType, value) => {
  return {
    type: 'SET_JML_NOTIF_MASING_MASING_APPROVAL',
    inputType: inputType,
    inputValue: value,
  };
};
