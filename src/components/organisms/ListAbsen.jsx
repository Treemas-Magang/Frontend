/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CardListAbsen from '../molecules/CardListAbsen';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

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
      status: 'hadir',
    },
    {
      tanggal_absen: 'Selasa 28 April',
      jam_masuk: '',
      lokasi_masuk: '',
      jam_pulang: '',
      lokasi_pulang: '',
      status: 'sakit',
    },
    {
      tanggal_absen: 'Selasa 29 April',
      jam_masuk: '09:45',
      lokasi_masuk:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      jam_pulang: '09:45',
      lokasi_pulang:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      status: 'hadir',
    },
  ]);
  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapAbsen}>
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
                tanggal_absen={dataAbsen.tanggal_absen}
                jam_masuk={dataAbsen.jam_masuk}
                jam_pulang={dataAbsen.jam_pulang}
                lokasi_masuk={dataAbsen.lokasi_masuk}
                lokasi_pulang={dataAbsen.lokasi_pulang}
                status={
                  dataAbsen.status === 'hadir'
                    ? 'hadir'
                    : dataAbsen.status === 'sakit'
                    ? 'sakit'
                    : ''
                }
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
});
