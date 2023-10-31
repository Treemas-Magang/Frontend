/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import CardRekapClaim from '../molecules/CardRekapClaim';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListRekapClaim = ({navigation}) => {
  const [claim, setClaim] = useState([
    {
      tanggal: 'Senin 2 Mei 2023',
      type: 'Lain-Lain',
      keterangan: 'Claim Makan Malam Sit CTBC Tgl 7 Oktober',
      nominalClaim: 250000,
    },
    {
      tanggal: 'Senin 3 Mei 2023',
      type: 'Lain-Lain',
      keterangan: 'Test Claim 1',
      nominalClaim: 50000,
    },
    {
      tanggal: 'Senin 4 Mei',
      type: 'Lain-Lain',
      keterangan: 'Test Claim 2',
      nominalClaim: 100000,
    },
    {
      tanggal: 'Senin 5 Mei',
      type: 'Lain-Lain',
      keterangan: 'Test Claim 3',
      nominalClaim: 220000,
    },
    {
      tanggal: 'Senin 6 Mei 2023',
      type: 'Lain-Lain',
      keterangan: 'Test Claim 4',
      nominalClaim: 150000,
    },
  ]);
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <View style={styles.wrapKeteranganClaim}>
        <View
          style={{
            width: wp('100%'),
            height: hp('20%'),
            justifyContent: 'center',
          }}>
          <Text style={styles.Judul}>Keterangan Cuti</Text>
        </View>
      </View>
      <View style={styles.backgroundCardClaim}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {claim.map((claim, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardRekapClaim
                navigation={navigation}
                tanggal={claim.tanggal}
                type={claim.type}
                keterangan={claim.keterangan}
                nominalClaim={claim.nominalClaim}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListRekapClaim;

const styles = StyleSheet.create({
  backgroundCardClaim: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('5.5%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  wrapKeteranganClaim: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
