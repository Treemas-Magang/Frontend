// import { setBiometricType } from '../redux';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
// export const checkBiometryType = async (dispatch) => {
//     const rnBiometrics = new ReactNativeBiometrics()
//   try {
//     const { biometryType } = await rnBiometrics.isSensorAvailable()
//     if (biometryType === BiometryTypes.TouchID) {
//       dispatch(setBiometricType(biometryType));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { setBiometricType } from '../redux'


export const checkBiometryType = async (dispatch) => {

    const rnBiometrics = new ReactNativeBiometrics()
    
    await rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject
    
        if (available && biometryType === BiometryTypes.TouchID) {
            dispatch(setBiometricType('TouchID is supported'))
          console.log('TouchID is supported')
        } else if (available && biometryType === BiometryTypes.FaceID) {
            dispatch(setBiometricType('FaceID is supported'))
          console.log('FaceID is supported')
        } else if (available && biometryType === BiometryTypes.Biometrics) {
            dispatch(setBiometricType('Biometrics is supported'))
          console.log('Biometrics is supported')
        } else {
            dispatch(setBiometricType('Biometrics not supported'))
          console.log('Biometrics not supported') 
        }
      })
}
