/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import CardListAbsen from '../molecules/CardListAbsen';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';

const ListAbsen = ({navigation}) => {
  const [dataAbsens, setDataAbsens] = useState([
    {
      tanggal_absen: 'Selasa 27 April',
      jam_masuk: '09:45',
      lokasi_masuk:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      jam_pulang: '09:45',
      lokasi_pulang:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      status: 'sakit',
    },
    {
      tanggal_absen: 'Selasa 27 April',
      jam_masuk: '09:45',
      lokasi_masuk:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      jam_pulang: '09:45',
      lokasi_pulang:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      status: 'sakit',
    },
    {
      tanggal_absen: 'Selasa 27 April',
      jam_masuk: '09:45',
      lokasi_masuk:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      jam_pulang: '09:45',
      lokasi_pulang:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      status: 'sakit',
    },
    {
      tanggal_absen: 'Selasa 27 April',
      jam_masuk: '09:45',
      lokasi_masuk:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      jam_pulang: '09:45',
      lokasi_pulang:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      status: 'sakit',
    },
    {
      tanggal_absen: 'Selasa 27 April',
      jam_masuk: '09:45',
      lokasi_masuk:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      jam_pulang: '09:45',
      lokasi_pulang:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      status: 'sakit',
    },
  ]);
  return (
    <View style={styles.background}>
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 20, right: 20}}
      />
      <View style={styles.wrapAbsen}>
        <Image
          style={styles.VectorAtas}
          source={require('../../assets/vector/VectorAtas.png')}
        />
        <Text style={styles.judul}>ABSEN</Text>
      </View>
      <View style={styles.wrapCardAbsen}>
        <View style={styles.wrapStatus}>
          <View style={styles.simbolStatus} />
          <Text>Sakit/Izin</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataAbsens.map((dataAbsen, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardListAbsen
                navigation={navigation}
                jam_masuk={dataAbsen.jam_masuk}
                jam_pulang={dataAbsen.jam_pulang}
                lokasi_masuk={dataAbsen.lokasi_masuk}
                lokasi_pulang={dataAbsen.lokasi_pulang}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListAbsen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapAbsen: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardAbsen: {
    flex: 6,
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    backgroundColor: Color.cardSakit,
    borderRadius: 15,
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
