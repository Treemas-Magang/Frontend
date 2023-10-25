/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color} from '../../utils/color';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import MenuUtama from '../../components/organisms/MenuUtama';
import DataPribadi from '../../components/molecules/DataPribadi';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ScreenDashboard = ({navigation}) => {
  return (
    <View style={{backgroundColor: Color.green, flex: 1}}>
      <View>
        <ButtonLogout navigation={navigation} style={{height: hp('10%')}} />
      </View>
      <View
        style={{
          height: hp('20%'),
          width: wp('100%'),
          alignItems: 'center',
        }}>
        <DataPribadi
          styleDataPribadi={{
            width: wp('75%'),
            // backgroundColor: 'red',
          }}
          stylePP={{width: wp('20%')}}
          styleText={{fontSize: hp('2.6%')}}
        />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.judulSection}>Statistik Tahun ini</Text>
        <StatistikTahunIni
          styleCard={{height: hp('6.6%'), width: wp('17%')}}
          styleContainerCard={{height: hp('6.6%'), width: wp('17%')}}
          styleInfo={{fontSize: hp('2%')}}
          styleTitle={{fontSize: hp('1.3%')}}
          style={{width: wp('68%'), backgroundColor: 'blue'}}
        />
        <View style={styles.containerMenu}>
          <Text style={styles.judulSection}>menu utama</Text>
          <MenuUtama navigation={navigation} />
        </View>
      </View>
    </View>
  );
};
export default ScreenDashboard;

const styles = StyleSheet.create({
  containerInfo: {
    backgroundColor: Color.white,
    width: wp('100%'),
    height: hp('70%'),
    alignItems: 'center',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
  },
  containerMenu: {
    backgroundColor: Color.green,
    width: wp('100%'),
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
    position: 'relative',
  },
  judulSection: {
    marginVertical: hp('2%'),
    fontSize: 16,
    fontFamily: text.bold,
    color: Color.blue,
    textTransform: 'uppercase',
  },
});
