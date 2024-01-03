/* eslint-disable prettier/prettier */
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute} from '@react-navigation/native';
import Pinchable from 'react-native-pinchable';
import axios from 'axios';
import {API_GABUNGAN} from '@env';
import {getDataFromSession} from '../../utils/getDataSession';

const ScreenPreviewPhotoAPI = ({navigation}) => {
  const route = useRoute();
  const {path} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [image64, setImage64] = useState('');
  const getDataFoto = async (headers, pathAPI) => {
    console.log('hello');
    try {
      const response = await axios.get(API_GABUNGAN + pathAPI, {
        headers,
      });
      const parts = pathAPI.split('/');
      // Mendapatkan bagian yang diperlukan
      const bagianSetelahSlash = parts[3];
      const bagianSebelumTandaTanya = bagianSetelahSlash.split('?')[0];
      const pathAPIBaru = bagianSebelumTandaTanya;

      console.log(pathAPIBaru);
      console.log(response.data.data);
      let dataAPI;
      if (pathAPIBaru === 'get-detail-sakit') {
        dataAPI = response.data.data.image;
      } else {
        dataAPI = response.data.data.image64;
      }

      console.log('data : ', dataAPI);
      setImage64(dataAPI);

      setIsLoading(false);
    } catch (error) {
      console.log('Tidak dapat mengambil data ', error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataFoto(headers, path);
      })
      .catch(error => console.log(error));
  }, [path]);

  let base64ImageData = null;
  if (image64) {
    base64ImageData = `data:image/jpeg;base64,${image64}`;
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  // console.log('ini base64Image : ', base64ImageData);

  return (
    <View
      style={{
        backgroundColor: '#2C3333',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ButtonBack navigation={navigation} />
      <ButtonHome styleColor={Color.white} navigation={navigation} />
      <View style={styles.SectionPreview}>
        {isLoading ? (
          <ActivityIndicator color={Color.white} size="large" />
        ) : (
          <Pinchable>
            <Image
              source={{uri: base64ImageData}}
              style={{
                height: hp('90%'),
                width: wp('90%'),
              }}
              resizeMode="contain"
            />
          </Pinchable>
        )}
      </View>
    </View>
  );
};

export default ScreenPreviewPhotoAPI;

const styles = StyleSheet.create({
  SectionPreview: {
    height: hp('100%'),
    width: wp('100%'),
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
