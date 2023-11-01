/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {launchCamera} from 'react-native-image-picker';
// import RNFS from 'react-native-fs'; // Untuk Android

const ButtonCamera = ({onImageCapture}) => {
  // const [imageCamera, setImageCamera] = useState(null);
  // const [loading, setLoading] = useState(false);

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.03,
      includeBase64: true,
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancel take photo');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        console.log(response);
        // setImageCamera(response.assets[0]);
        await onImageCapture(response.assets[0]);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openCamera}>
        <FontAwesomeIcon icon={faCamera} color={Color.green} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCamera;
