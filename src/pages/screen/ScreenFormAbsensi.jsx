/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormAbsensi from '../../components/organisms/FormAbsensi';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';

const ScreenFormAbsensi = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <Image
          style={styles.VectorAtasKanan}
          source={require('../../assets/vector/VectorKananAtas.png')}
        />
        <View style={styles.wrapperForm}>
          <FormAbsensi />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormAbsensi;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingVertical: 80,
    width: '100%',
    height: '100%',
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: -30,
    right: 0,
    zIndex: -1,
  },
});
