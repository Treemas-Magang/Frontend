/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import CardAbsenBelumPulang from '../molecules/CardAbsenBelumPulang';
import ButtonHome from '../atoms/ButtonHome';

const ListAbsenBelumPulang = ({navigation}) => {
  const [AbsenBelumPulang, setAbsenBelumPulang] = useState([
    {
      tanggal: 'Selasa 05 April',
      jam_masuk: '10:00',
      project: 'TREEMAS SOLUSI UTAMA',
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
      project: 'MANDIRI',
      note_telat: 'Kesiangan',
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
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 20, right: 20}}
      />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>ABSEN BELUM PULANG</Text>
      <View style={styles.backgroundCardAbsenBelumPulang}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* /////////////////////////////////////////////////////////////////// */}
          {AbsenBelumPulang.map((AbsenBelumPulang, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardAbsenBelumPulang
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

export default ListAbsenBelumPulang;

const styles = StyleSheet.create({
  backgroundCardAbsenBelumPulang: {
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
    marginVertical: 112,
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
});
