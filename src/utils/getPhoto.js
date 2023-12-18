/* eslint-disable prettier/prettier */
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openCamera = () => {
  return new Promise((resolve, reject) => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      maxFileSize: 720 * 720,
      includeBase64: true,
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User canceled taking a photo');
        reject('User canceled taking a photo');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
        reject(response.errorMessage);
      } else {
        console.log(response);
        const onImageCapture = response.assets[0];
        resolve(onImageCapture);
      }
    });
  });
};
export const openGalerImg = () => {
  return new Promise((resolve, reject) => {
    const option = {
      mediaType: 'photo',
      quality: 0.7,
      maxFileSize: 720 * 720,
      includeBase64: true,
    };

    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('User canceled selecting a photo');
        reject('User canceled selecting a photo');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
        reject(res.errorMessage);
      } else {
        console.log(res);
        const onImageCapture = res.assets[0];
        console.log('belum di render : ', onImageCapture.base64);
        resolve(onImageCapture);
      }
    });
  });
};
