/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import ButtonBack from '../atoms/ButtonBack';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardRekapCuti from '../molecules/CardRekapCuti';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListRekapCuti = ({navigation}) => {
  return (
    <View style={styles.background}>
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20, zIndex: 99}}
      />
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 10, right: 10, zIndex: 99}}
      />
      <Image
        style={styles.VectorAtasKanan}
        source={require('../../assets/vector/VectorKananAtas.png')}
      />
      <View style={styles.wrapKeteranganCuti}>
        <View
          style={{
            width: wp('100%'),
            height: hp('30%'),
            justifyContent: 'center',
          }}>
          <Text style={styles.Judul}>Keterangan Cuti</Text>
        </View>
      </View>
      <View style={styles.wrapCardRekapCuti}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardRekapCuti />
          <CardRekapCuti />
          <CardRekapCuti />
          <CardRekapCuti />
          <CardRekapCuti />
          <CardRekapCuti />
          <CardRekapCuti />
        </ScrollView>
      </View>
    </View>
  );
};

export default ListRekapCuti;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapKeteranganCuti: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardRekapCuti: {
    flex: 6,
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    backgroundColor: Color.cardSakit,
    borderRadius: 15,
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
