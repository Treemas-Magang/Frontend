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
      <View style={styles.wrapDataPribadi}>
        <DataPribadi
          styleDataPribadi={styles.lebarDataPribadi}
          stylePP={styles.ukuranPP}
          styleText={styles.ukuranNamaNik}
        />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.judulSection}>Statistik Tahun ini</Text>
        <StatistikTahunIni
          styleContainerCard={styles.styleConatinerCard}
          styleCard={styles.ukuranCard}
          styleInfo={styles.styleInfo}
          styleTitle={styles.titleInfo}
          style={styles.styleStatistikTahunIni}
        />
        <View style={styles.containerMenu}>
          <Text style={styles.judulSection}>menu utama</Text>
          <MenuUtama
            styleImage={styles.imgIcon}
            styleNamaMenu={styles.namaMenu}
            wrapIcon={styles.wrapImgIcon}
            gap={styles.gapMenuIcon}
            box={styles.boxMenuIcon}
            navigation={navigation}
          />
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
    width: wp('100%'),
    height: hp('48%'),
    backgroundColor: Color.green,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
  },
  judulSection: {
    marginVertical: hp('2%'),
    fontSize: hp('2%'),
    fontFamily: text.bold,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  wrapDataPribadi: {
    height: hp('15%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  lebarDataPribadi: {
    width: wp('75%'),
  },
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
  ukuranNamaNik: {fontSize: hp('2%')},
  styleConatinerCard: {
    height: hp('6.6%'),
    width: wp('22%'),
  },
  ukuranCard: {
    height: hp('6.6%'),
    width: wp('17%'),
  },
  styleInfo: {fontSize: hp('2%')},
  titleInfo: {fontSize: hp('1.3%')},
  styleStatistikTahunIni: {width: wp('90%'), height: hp('22%')},
  imgIcon: {width: wp('16%'), height: hp('9%')},
  namaMenu: {fontSize: hp('1.8%')},
  wrapImgIcon: {gap: wp('5%'), height: hp('45%')},
  gapMenuIcon: {gap: wp('10%'), width: wp('100%'), justifyContent: 'center'},
  boxMenuIcon: {width: wp('29%')},
});
