/* eslint-disable prettier/prettier */
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
import CardTimesheet from '../molecules/CardTimesheet';
const ListTimesheet = ({navigation}) => {
  const [timesheet, setTimesheet] = useState([
    {
      tanggal: 'Selasa 05 April',
      penempatan: 'TREEMAS SOLUSI UTAMA',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Rabu 06 April',
      penempatan: 'TREEMAS SOLUSI UTAMA',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Kamis 07 April',
      penempatan: 'TREEMAS SOLUSI UTAMA',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Jumat 08 April',
      penempatan: 'TREEMAS SOLUSI UTAMA',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Senin 11 April',
      penempatan: 'TREEMAS SOLUSI UTAMA',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Selasa 12 April',
      penempatan: 'TREEMAS SOLUSI UTAMA',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
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
        <Text style={styles.Judul}>Timesheet</Text>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {timesheet.map((timesheet, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardTimesheet
                navigation={navigation}
                lokasi={timesheet.lokasi}
                penempatan={timesheet.penempatan}
                tanggal={timesheet.tanggal}
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
            <View style={{alignItems: 'center'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>
                  Total Jam Reguler
                </Text>
                <Text style={styles.textValue}>75 Jam</Text>
              </>
            </View>
            <View style={{alignItems: 'center'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>
                  Total Jam Reguler
                </Text>
                <Text style={styles.textValue}>75 Jam</Text>
              </>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontFamily: text.boldItalic, color: Color.black}}>
                Total Jam Kerja
              </Text>
              <Text style={styles.textValue}>75 Jam</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListTimesheet;

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
    minHeight: hp('10%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: wp('3.5%'),
    textAlign: 'center',
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
