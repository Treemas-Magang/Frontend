/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import CardPilihAbsenProject from '../molecules/CardPilihAbsenProject';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
const PilihAbsenProject = ({navigation}) => {
  const {namaTempat, alamat, projectId, gpsLatProj, gpsLongProj, jrkMax, jamMasuk, jamKeluar} = useRoute().params;
  console.log('project id : ', projectId);
  console.log('project latitude : ', gpsLatProj);
  console.log('project jrkMax : ', jrkMax);
  console.log('project jamMsk : ', jamMasuk);
  console.log('project jamKlr : ', jamKeluar);
  return (
    <View style={styles.CardUpdateTimesheet}>
      <Text
        style={{
          fontFamily: text.semiBold,
          textTransform: 'uppercase',
          fontSize: 17,
          color: Color.blue,
        }}>
        MEMILIH LOKASI ABSENSI PROJECT
      </Text>
      <CardPilihAbsenProject
        alamat={alamat}
        namaTempat={namaTempat}
        projectId={projectId}
        gpsLatProj={gpsLatProj}
        jrkMax={jrkMax}
        gpsLongProj={gpsLongProj}
        jamMasuk={jamMasuk}
        jamKeluar={jamKeluar}
        navigation={navigation}
      />
    </View>
  );
};

export default PilihAbsenProject;
const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    width: wp('85%'),
    height: hp('55%'),
    backgroundColor: Color.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
