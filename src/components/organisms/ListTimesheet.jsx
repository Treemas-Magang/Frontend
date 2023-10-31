/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CardTimesheet from '../molecules/CardTimesheet';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
        <Text style={styles.Judul}>Timesheet</Text>
      </View>
      <View style={styles.backgroundCardTimesheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* /////////////////////////////////////////////////////////////////// */}
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
          {/* /////////////////////////////////////////////////////////////////// */}
        </ScrollView>
        <View style={styles.catatanKerja}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={{fontFamily: text.lightItalic}}>
              Total Jam Reguler
            </Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={{fontFamily: text.lightItalic}}>Total Lembur</Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: text.boldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListTimesheet;

const styles = StyleSheet.create({
  backgroundCardTimesheet: {
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
    gap: 10,
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.black,
    width: wp('80%'),
    marginTop: 10,
    marginBottom: 60,
    minHeight: hp('15%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
});
