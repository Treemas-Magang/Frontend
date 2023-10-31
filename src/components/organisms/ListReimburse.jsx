/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardReimburse from '../molecules/CardReimburse';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
const ListReimburse = ({navigation}) => {
  const [reimburses, setReimburses] = useState([
    {
      tanggal: 'Senin 2 Mei',
      totalJam: 8,
      overtime: 0,
      transport: 50000,
      uangMakan: 50000,
    },
    {
      tanggal: 'Senin 3 Mei',
      totalJam: 8,
      overtime: 2,
      transport: 20000,
      uangMakan: 50000,
    },
    {
      tanggal: 'Senin 4 Mei',
      totalJam: 2,
      overtime: 9,
      transport: 50000,
      uangMakan: 100000,
    },
    {
      tanggal: 'Senin 5 Mei',
      totalJam: 8,
      overtime: 2,
      transport: 50000,
      uangMakan: 220000,
    },
    {
      tanggal: 'Senin 6 Mei',
      totalJam: 8,
      overtime: 1,
      transport: 50000,
      uangMakan: 150000,
    },
  ]);
  const [isShowCatatanKerja, setIsShowCatatanKerja] = useState(false);
  const showCatatanKerja = () => {
    setIsShowCatatanKerja(!isShowCatatanKerja);
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <View
        style={{
          width: wp('100%'),
          height: hp('15%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Reimburse</Text>
      </View>
      <View style={styles.backgroundCardReimburse}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {reimburses.map((reimburse, index) => (
            <View key={index}>
              <CardReimburse
                navigation={navigation}
                tanggal={reimburse.tanggal}
                totalJam={reimburse.totalJam}
                overtime={reimburse.overtime}
                transport={reimburse.transport}
                uangMakan={reimburse.uangMakan}
              />
            </View>
          ))}
        </ScrollView>
        <View
          style={
            isShowCatatanKerja
              ? styles.tampilkanCatatanKerja
              : styles.dontShowCatatanKerja
          }>
          <TouchableOpacity
            style={styles.btnShowCatatanKerja}
            onPress={showCatatanKerja}>
            <FontAwesomeIcon
              icon={isShowCatatanKerja ? faAngleDoubleDown : faAngleDoubleUp}
              size={30}
              color={Color.white}
            />
          </TouchableOpacity>
          <View style={styles.catatanKerja}>
            <View style={{alignItems: 'flex-start'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>Reimburse </Text>
                <Text style={styles.textValue}>Rp. 0</Text>
              </>
              <>
                <Text style={{fontFamily: text.lightItalic}}>
                  Data + Voice{' '}
                </Text>
                <Text style={styles.textValue}>Rp. 150.000</Text>
              </>
              <>
                <Text style={{fontFamily: text.lightItalic}}>Lain-lain </Text>
                <Text style={styles.textValue}>Rp. 0</Text>
              </>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>Total </Text>
                <Text style={[styles.textValue, {fontSize: 16}]}>
                  Rp. 150.000
                </Text>
              </>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListReimburse;

const styles = StyleSheet.create({
  backgroundCardReimburse: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('91.5%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  catatanKerja: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: 10,
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Color.black,
    width: wp('80%'),
    minHeight: hp('15%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: 10,
  },
  dontShowCatatanKerja: {
    position: 'absolute',
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: Color.white,
    paddingVertical: 20,
    bottom: hp('-11%'),
  },
  tampilkanCatatanKerja: {
    position: 'absolute',
    backgroundColor: Color.white,
    width: wp('100%'),
    height: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  },
  btnShowCatatanKerja: {
    width: 50,
    height: 50,
    backgroundColor: Color.black,
    position: 'absolute',
    top: -30,
    right: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
