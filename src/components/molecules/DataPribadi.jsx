/* eslint-disable prettier/prettier */

import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import React from 'react';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {text} from '../../utils/text';

const DataPribadi = ({stylePP, styleDataPribadi}) => {
  const {dataUser} = useSelector(state => state.DataUserReducer);

  let base64ImageData = '';
  if (dataUser.karyawanImg !== '') {
    base64ImageData = `data:image/jpeg;base64,${dataUser.karyawanImg}`;
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        styleDataPribadi,
      ]}>
      <View>
        <Text style={[styles.textNama]}>
          {dataUser.full_name}
        </Text>
        <Text style={[styles.textNik]}>
          {dataUser.nik}
        </Text>
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
    </View>
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
