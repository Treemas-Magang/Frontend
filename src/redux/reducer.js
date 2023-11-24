/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
import {combineReducers} from 'redux';

const initialStateLogin = {
  title: 'Login Page',
  isLogin: true,
  formLogin: {
    nik: '',
    password: '',
    handsetImei: '',
    isWebAccess: ''
  },
};
const LoginReducer = (state = initialStateLogin, action) => {
  if (action.type === 'SET_FORM') {
    return {
      ...state,
      formLogin: {
        ...state.formLogin,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateLoginFingerPrint = {
  title: 'Login Page',
  isLogin: true,
  formLoginFP: {
    nik: '',
    password: '',
    handsetImei: '',
    isWebAccess: ''
  },
};
const LoginFingerPrintReducer = (
  state = initialStateLoginFingerPrint,
  action,
) => {
  if (action.type === 'SET_FORM_LOGIN_FINGERPRINT') {
    return {
      ...state,
      formLoginFP: {
        ...state.formLoginFP,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const initialStateSplash = {
  location: {
    latitude: null,
    longitude: null,
    accuracy: null,
  },
  app: {
    version: '',
  },
  isLoading: true,
};

const SplashReducer = (state = initialStateSplash, action) => {
  if (action.type === 'SET_LOCATION') {
    return {
      ...state,
      location: {
        ...state.location,
        latitude: action.latitude,
        longitude: action.longitude,
        accuracy: action.accuracy,
      },
    };
  }
  if (action.type === 'SET_APP_VERSION') {
    return {
      ...state.app,
      app: {
        version: action.version,
      },
    };
  }
  return state;
};
const initialStateTimesheet = {
  form: {
    keterangan: '',
  },
};
const TimesheetReducer = (state = initialStateTimesheet, action) => {
  if (action.type === 'SET_FORM_UPDATE_TIMESHEET') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const initialStateCheckBiometricType = {
  biometricType: null,
};
const CheckBiometricTypeReducer = (
  state = initialStateCheckBiometricType,
  action,
) => {
  if (action.type === 'SET_BIOMETRIC_TYPE') {
    return {
      ...state,
      biometricType: action.biometricType,
    };
  }
  return state;
};

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

const initialStateAbsenPulang = {
  formPulang: {
    notePekerjaan: '',
    projectId: '',
    lokasiPlg: '',
    jarakPlg: '',
    notePlgCepat: '',
    gpsLatitudePlg: null,
    gpsLongitudePlg: null,
  },
};
const AbsenPulangReducer = (state = initialStateAbsenPulang, action) => {
  if (action.type === 'SET_FORM_ABSEN_PULANG') {
    return {
      ...state,
      formPulang: {
        ...state.formPulang,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateFormCuti = {
  form: {
    tglMulai: '',
    tglSelesai: '',
    tglKembaliKerja: '',
    keperluanCuti: '',
    alamatCuti: '',
    jmlCutiBersama: null,
    jmlCutiKhusus: null,
    selectedMasterCutiId: '',
    jmlCuti: null,
  },
};
const FormCutiReducer = (state = initialStateFormCuti, action) => {
  if (action.type === 'SET_FORM_CUTI') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateFormSakit = {
  form: {
    nik: '',
    tanggal_sakit: '',
    tanggal_selesai: '',
    tanggal_masuk: '',
    jml_sakit: '',
    alasan: '',
    foto: {},
  },
};
const FormSakitReducer = (state = initialStateFormSakit, action) => {
  if (action.type === 'SET_FORM_SAKIT') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const initialStateAbsensi = {
  formAbsensi: {
    lokasiMsk: '',
    jarakMsk: '',
    noteTelatMsk: '',
    gpsLatitudeMsk: null,
    gpsLongitudeMsk: null,
    isWfh: '',
    photoAbsen: ''
  },
};
const FormAbsensiReducer = (state = initialStateAbsensi, action) => {
  if (action.type === 'SET_FORM_ABSENSI') {
    return {
      ...state,
      formAbsensi: {
        ...state.formAbsensi,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateClaim = {
  form_claim: {
    nik: '',
    nama: '',
    projectId: '',
    keterangan: '',
    nominal: 0,
    id_claim: '',
    image64: '',
  },
};
const FormClaimReducer = (state = initialStateClaim, action) => {
  if (action.type === 'SET_FORM_CLAIM') {
    return {
      ...state,
      form_claim: {
        ...state.form_claim,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const initialStateDetailApproval = {
  form: {
    catatanApproval: '',
  },
};
const CatatanApprovalReducer = (state = initialStateDetailApproval, action) => {
  if (action.type === 'SET_FORM_CATATAN_APPROVAL') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateAbsenMasuk = {
  form: {
    project_id: '',
    nik: '',
    nama: '',
    hari: '',
    tgl_absen: '',
    gps_latitude_msk: null,
    gps_longitude_msk: null,
    lokasi_msk: '',
    jarak_msk: '',
    jam_msk: '',
    note_telat_msk: '',
    is_absen: 0,
    is_wfh: 0,
  },
};
const AbsenMasukReducer = (state = initialStateAbsenMasuk, action) => {
  if (action.type === 'SET_FORM_ABSEN_MASUK') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateUpdateAbsen = {
  form: {
    project_id: '',
    nik: '',
    nama: '',
    hari: '',
    tgl_absen: '',
    gps_latitude_msk: null,
    gps_longitude_msk: null,
    lokasi_msk: '',
    jarak_msk: '',
    jam_msk: '',
    note_telat_msk: '',
    is_absen: 0,
    is_wfh: 0,
  },
};
const UpdateAbsenReducer = (state = initialStateUpdateAbsen, action) => {
  if (action.type === 'SET_FORM_UPDATE_ABSEN') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
// const initialStateAbsenPulang = {
//   formAbsenPulang: {
//     NotePekerjaan: '',
//     gpsLatitudePlg: null,
//     gpsLongitudePlg: null,
//     lokasiPlg: '',
//     jarakPlg: '',
//     notePlgCepat: '',
//   },
// };
// const AbsenPulangReducer = (state = initialStateAbsenPulang, action) => {
//   if (action.type === 'SET_FORM_ABSEN_PULANG') {
//     return {
//       ...state,
//       formAbsenPulang: {
//         ...state.formAbsenPulang,
//         [action.inputType]: action.inputValue,
//       },
//     };
//   }
//   return state;
// };

const initialStateUpdatepassword = {
  title: 'Login Page',
  isLogin: true,
  form: {
    nik: '',
    password_baru: '',
    is_chg_pass: '',
  },
};
const UpdatePasswordReducer = (state = initialStateUpdatepassword, action) => {
  if (action.type === 'SET_FORM_UPDATE_PASSWORD') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};
const initialStateJumlahPengumuman = {
  pengumuman: 0,
};

const JumlahPengumumanReducer = (
  state = initialStateJumlahPengumuman,
  action,
) => {
  if (action.type === 'SET_JUMLAH_PENGUMUMAN') {
    return {
      ...state,
      pengumuman: action.inputValue,
    };
  }
  return state;
};
const initialStateJumlahApproval = {
  approval: 0,
};

const JumlahApprovalReducer = (
  state = initialStateJumlahApproval,
  action,
) => {
  if (action.type === 'SET_JUMLAH_APPROVAL') {
    return {
      ...state,
      [action.inputType]: action.inputValue,
    };
  }
  return state;
};
// const initialStateSudahMasuk = {
//   sudah_masuk: false,
//   sudah_update : false,
//   sudah_pulang : false,
// };

// const SudahMasukReducer = (
//   state = initialStateSudahMasuk,
//   action,
// ) => {
//   if (action.type === 'SET_SUDAH_MASUK') {
//     return {
//       ...state,
//       sudah_masuk: action.inputValue,
//     };
//   }
//   return state;
// };
const initialStateProjectYangDipilih = {
  dataProject : {
    namaTempat: '',
    alamat: '',
    projectId: '',
    gpsLatProj: null,
    gpsLongProj: null,
    jrkMax: null,
    jamMasuk: '',
    jamKeluar: '',
  }
};

const ProjectYangDipilihReducer = (
  state = initialStateProjectYangDipilih,
  action,
) => {
  if (action.type === 'SET_PROJECT_YANG_DIPILIH') {
    return {
      ...state,
      dataProject: {
        ...state.dataProject,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const initialStateIsWFH = {
  isWFH: '',
};

const IsWFHReducer = (state = initialStateIsWFH, action) => {
  if (action.type === 'SET_IS_WFH') {
    return {
      ...state,
      isWFH: action.inputValue,
    };
  }
  return state;
};

const reducer = combineReducers({
  LoginReducer,
  SplashReducer,
  TimesheetReducer,
  CheckBiometricTypeReducer,
  userReducer,
  // CatatanKerjaReducer,
  FormCutiReducer,
  FormSakitReducer,
  FormAbsensiReducer,
  FormClaimReducer,
  CatatanApprovalReducer,
  LoginFingerPrintReducer,
  AbsenMasukReducer,
  AbsenPulangReducer,
  UpdateAbsenReducer,
  UpdatePasswordReducer,
  JumlahPengumumanReducer,
  JumlahApprovalReducer,
  ProjectYangDipilihReducer,
  IsWFHReducer,
  // SudahMasukReducer,
});

export default reducer;
