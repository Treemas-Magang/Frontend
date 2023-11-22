/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
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
import {useSelector} from 'react-redux';
import {cekToken} from '../../utils/cekToken';
import {tracking} from '../../utils/tracking';
import {AlertNotificationSuccess} from '../../components/atoms/AlertNotification';
const ScreenDashboard = ({navigation}) => {
  const {pengumuman} = useSelector(state => state.JumlahPengumumanReducer);
  const {approval} = useSelector(state => state.JumlahApprovalReducer);
  const [jmlBlmBaca, setJmlBlmBaca] = useState(0);

  useEffect(() => {
    cekToken();
  }, []);

  useEffect(() => {
    const totalNotif = pengumuman + approval;
    setJmlBlmBaca(totalNotif);
  }, [approval, pengumuman]);

  // Start a timer that runs continuous after X milliseconds

  // const intervalId = BackgroundTimer.setInterval(() => {
  //   console.log('tik')
  // }, 1000)
  // // Cleanup the interval when the component unmounts
  // useEffect(() => {
  //   return () => {
  //     // Stop the interval when the component unmounts
  //     BackgroundTimer.clearInterval(intervalId);
  //   };
  // }, [intervalId]);

  return (
    <View style={{backgroundColor: Color.green, flex: 1}}>
      <View>
        <ButtonLogout
          navigation={navigation}
          posisiLogout={{top: hp('2%')}}
          style={{height: hp('10%')}}
        />
      </View>
      <View style={styles.wrapDataPribadi}>
        <DataPribadi
          styleDataPribadi={styles.lebarDataPribadi}
          stylePP={styles.ukuranPP}
        />
      </View>
      <Image
        style={styles.VectorAtasDashboard}
        resizeMode="contain"
        source={require('../../assets/vector/VectorAtasDashboard.png')}
      />
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
          <Text style={styles.judulSectionMenu}>menu utama</Text>
          <MenuUtama
            styleImage={styles.imgIcon}
            styleNamaMenu={styles.namaMenu}
            wrapIcon={styles.wrapImgIcon}
            gap={styles.gapMenuIcon}
            box={styles.boxMenuIcon}
            navigation={navigation}
            jml_blm_baca={jmlBlmBaca}
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
    height: hp('43%'),
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
  judulSectionMenu: {
    marginVertical: hp('1.5%'),
    fontSize: hp('2.5%'),
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
  styleConatinerCard: {
    height: hp('6.6%'),
    width: wp('22%'),
  },
  ukuranCard: {
    height: hp('6.6%'),
    width: wp('17%'),
  },
  styleInfo: {
    fontSize: hp('2%'),
  },
  titleInfo: {
    fontSize: hp('1.3%'),
  },
  styleStatistikTahunIni: {
    width: wp('90%'),
    height: hp('22%'),
  },
  imgIcon: {
    width: wp('16%'),
    height: hp('9%'),
  },
  namaMenu: {
    fontSize: hp('1.8%'),
  },
  wrapImgIcon: {
    gap: wp('10%'),
    height: hp('35%'),
    justifyContent: 'center',
  },
  gapMenuIcon: {
    gap: wp('10%'),
    width: wp('100%'),
    justifyContent: 'center',
  },
  boxMenuIcon: {
    width: wp('29%'),
  },
  VectorAtasDashboard: {
    position: 'absolute',
    top: hp('-1%'),
    right: wp('-10%'),
    zIndex: -1,
    width: wp('100%'),
  },
});
