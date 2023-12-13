/* eslint-disable prettier/prettier */

import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {text} from '../../utils/text';
import {getDataFromSession} from '../../utils/getDataSession';
import DetailProfile from '../organisms/DetailProfile';

const DataPribadi = ({stylePP, styleDataPribadi, navigation}) => {
  const [dataProfile, setDataProfile] = useState([]);
  let base64ImageData = '';
  if (dataProfile.karyawanImg !== null) {
    base64ImageData = `data:image/jpeg;base64,${dataProfile.karyawanImg}`;
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  // console.log(dataProfile)
  useEffect(() => {
    try {
      getDataFromSession('dataProfilUser')
        .then(data => {
          const dataProfileStorage = JSON.parse(data);
          console.log('data profil : ', dataProfileStorage);
          setDataProfile(dataProfileStorage);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log('ayam : ',dataProfile);
  const moveTo = () => {
    navigation.navigate('detailProfile');
  };

  return (
    <TouchableOpacity
      onPress={() => moveTo()}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        styleDataPribadi,
      ]}>
      <View>
        <Text style={[styles.textNama]}>{dataProfile.full_name}</Text>
        <Text style={[styles.textNik]}>{dataProfile.nik}</Text>
      </View>
      <View>
        {base64ImageData !== '' ? (
          <Image
            source={{uri: base64ImageData}}
            style={[styles.pp, stylePP]}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../../assets/vector/user.png')}
            style={[styles.pp, stylePP]}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DataPribadi;

const styles = StyleSheet.create({
  textNama: {
    fontFamily: text.semiBold,
    color: Color.blue,
    textTransform: 'uppercase',
    width: 200,
    fontSize: wp('4.5%'),
  },
  textNik: {
    fontFamily: text.regular,
    color: Color.blue,
    fontSize: wp('4.5%'),
  },
  pp: {
    borderRadius: 200,
  },
});
