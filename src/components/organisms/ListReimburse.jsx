/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
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
import VectorAtasKecil from '../atoms/VectorAtasKecil';
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
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />

      <View style={styles.containerJudul}>
        <Text style={styles.Judul}>reimburse</Text>
      </View>
      <View style={styles.content}>
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

        <TouchableOpacity
          onPress={showCatatanKerja}
          style={
            isShowCatatanKerja ? styles.btnOnInvoice : styles.btnOffInvoice
          }>
          <FontAwesomeIcon
            icon={isShowCatatanKerja ? faAngleDoubleDown : faAngleDoubleUp}
            size={30}
            color={Color.white}
          />
        </TouchableOpacity>
        <View
          style={
            isShowCatatanKerja
              ? styles.tampilkanCatatanKerja
              : styles.dontShowCatatanKerja
          }>
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
  container: {
    backgroundColor: Color.green,
    flex: 1,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  catatanKerja: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    backgroundColor: 'blue',
    minHeight: hp('10%'),
    width: wp('100%'),
    position: 'absolute',
    bottom: -150,
    alignItems: 'center',
  },
  tampilkanCatatanKerja: {
    // backgroundColor: 'blue',
    minHeight: hp('10%'),
    width: wp('100%'),
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  btnOffInvoice: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    backgroundColor: Color.black,
    position: 'absolute',
    bottom: 10,
    right: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOnInvoice: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    backgroundColor: Color.black,
    position: 'absolute',
    bottom: 140,
    right: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Color.white,
    flex: 5,
    position: 'relative',
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 35,
  },
  containerJudul: {
    flex: 1,
    justifyContent: 'center',
  },
});
