/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CardTimesheet from '../molecules/CardTimesheet';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';

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
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>TIMESHEET</Text>
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
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>
              Total Jam Reguler
            </Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>
              Total Lembur
            </Text>
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
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -100,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
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
    width: 280,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
});
