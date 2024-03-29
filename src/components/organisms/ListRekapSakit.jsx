/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import CardRekapSakit from '../molecules/CardRekapSakit';
import ButtonBack from '../atoms/ButtonBack';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasBesar from '../atoms/VectorAtasBesar';

const ListRekapSakit = ({navigation}) => {
  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <View style={styles.wrapKeteranganSakit}>
        <VectorAtasBesar />
        <Text style={styles.judul}>KETERANGAN SAKIT</Text>
      </View>
      <View style={styles.wrapCardRekapSakit}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardRekapSakit />
          <CardRekapSakit />
          <CardRekapSakit />
          <CardRekapSakit />
          <CardRekapSakit />
          <CardRekapSakit />
          <CardRekapSakit />
        </ScrollView>
      </View>
    </View>
  );
};

export default ListRekapSakit;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapKeteranganSakit: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardRekapSakit: {
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
  judul: {
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
});
