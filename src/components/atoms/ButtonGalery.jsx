/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faFileImage, faImage } from '@fortawesome/free-solid-svg-icons';
import { Color } from '../../utils/color';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { faImages } from '@fortawesome/free-regular-svg-icons';


const ButtonGalery = () => {
    const [imageGalery, setImageGalery] = useState(null)
    const opengalery = () => {
        const option = {
            mediaType: 'photo',
            quality: 1,
            maxFileSize: 1024 * 1024,
        }
        launchImageLibrary(option, (res) =>{
                if(res.didCancel){
                    console.log('user cancel take photo')
                }else if(res.errorCode){
                    console.log(res.errorMessage)
                }else{
                    const data = res.assets[0]
                    console.log(data)
                    setImageGalery(data)
                }
        })
    }
  return (
    <View>
    {
        imageGalery !== null &&
    <Image source={{uri:imageGalery.uri}} style={{height:100, width: 100}} />
    }
      <TouchableOpacity onPress={opengalery}>
        <FontAwesomeIcon icon={faImage} color={Color.green} size={50} />
      </TouchableOpacity>
    </View>
  );
}

export default ButtonGalery;