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
      quality: 1,
      maxWidth: 500,
      maxHeight: 300,
      maxFileSize: 1024 * 1024,
    };

    // setLoading(true); // Aktifkan pemuatan saat tombol diklik

    launchCamera(options, async response => {
      // setLoading(false); // Matikan pemuatan setelah mendapatkan respons

      if (response.didCancel) {
        console.log('User cancel take photo');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        console.log(response);
        // setImageCamera(response.assets[0]);
        onImageCapture(response.assets[0]);

        // try {
        //   // Mendapatkan direktori penyimpanan internal
        //   const internalDir = RNFS.DocumentDirectoryPath;

        //   // Generate nama file unik untuk disimpan
        //   const fileName = photo_${Date.now()}.jpg;

        //   // Menggabungkan direktori internal dengan nama file
        //   const destPath = ${internalDir}/${fileName};

        //   // Menyalin gambar ke penyimpanan internal
        //   await RNFS.copyFile(response.assets[0].uri, destPath);

        //   console.log('Foto berhasil disimpan ke penyimpanan internal:', destPath);
        // } catch (error) {
        //   console.error('Error saat menyimpan foto ke penyimpanan internal:', error);
        // }
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
