/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import DataPribadi from '../../components/molecules/DataPribadi';
import MenuRekap from '../../components/organisms/MenuRekap';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ButtonBack from '../../components/atoms/ButtonBack';
const ScreenDashboardRekap = ({navigation}) => {
  return (
    // <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View
      style={{
        backgroundColor: Color.green,
        flex: 1,
      }}>
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
          <ButtonBack navigation={navigation} />
          <Text style={styles.judulSectionMenu}>menu rekap</Text>
          <MenuRekap
            styleImage={styles.imgIcon}
            styleNamaMenu={styles.namaMenu}
            wrapIcon={styles.wrapImgIcon}
            gap={styles.gapMenuIcon}
            box={styles.boxMenuIcon}
            scrollViewContent={{height: hp('63%')}}
            navigation={navigation}
          />
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

export default ScreenDashboardRekap;

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
    height: hp('50%'),
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
    marginVertical: hp('3%'),
    fontSize: hp('3%'),
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
