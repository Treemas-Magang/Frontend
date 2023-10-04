/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faFileImage,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {faImages} from '@fortawesome/free-regular-svg-icons';

const ButtonGalery = ({onImageGalery}) => {
  const [imageGalery, setImageGalery] = useState(null);
  const opengalery = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 300,
      maxFileSize: 1024 * 1024,
    };
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('user cancel take photo');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        console.log(data);
        // setImageGalery(data)
        onImageGalery(data);
      }
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={opengalery}>
        <FontAwesomeIcon icon={faImage} color={Color.green} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGalery;
