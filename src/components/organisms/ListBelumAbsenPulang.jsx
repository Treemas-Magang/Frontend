/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import CardBelumAbsenPulang from '../molecules/CardBelumAbsenPulang';

const ListBelumAbsenPulang = ({navigation}) => {
  const [AbsenBelumPulang, setAbsenBelumPulang] = useState([
    {
      tanggal: 'Selasa 05 April',
      jam_masuk: '10:00',
      project:
        'TREEMAS SOLUSI UTAMA JAYA ABADI BLA BLA BLA BLA INDONESIA MERDEKA 1945',
      note_telat: 'Kesiangan',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Selasa 06 April',
      jam_masuk: '08:00',
      project: 'BANK BCA',
      note_telat: 'Kesiangan',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Selasa 07 April',
      jam_masuk: '11:00',
      project: 'BANK PTN',
      note_telat: 'Kesiangan',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
    {
      tanggal: 'Selasa 08 April',
      jam_masuk: '07:00',
      project: 'MANDIRI AJA NIH GAN SOAL NYA GA ADA PASANGAN',
      note_telat: 'Tadi macet di jalan ',
      lokasi:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
    },
  ]);
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('30%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Belum Absen Pulang</Text>
      </View>
      <View style={styles.backgroundCardBelumAbsenPulang}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* /////////////////////////////////////////////////////////////////// */}
          {AbsenBelumPulang.map((AbsenBelumPulang, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardBelumAbsenPulang
                navigation={navigation}
                jam_masuk={AbsenBelumPulang.jam_masuk}
                project={AbsenBelumPulang.project}
                note_telat={AbsenBelumPulang.note_telat}
                lokasi={AbsenBelumPulang.lokasi}
                tanggal={AbsenBelumPulang.tanggal}
              />
            </View>
          ))}
          {/* /////////////////////////////////////////////////////////////////// */}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListBelumAbsenPulang;

const styles = StyleSheet.create({
  backgroundCardBelumAbsenPulang: {
    backgroundColor: Color.white,
    paddingTop: 30,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -70,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
});
