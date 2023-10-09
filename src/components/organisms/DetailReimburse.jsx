import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';

const DetailReimburse = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
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
      <Text style={styles.Judul}>Detail Reimburse</Text>
      <View style={styles.backgroundCardReimburse}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.TextTitle}>Hari</Text>
            <Text style={styles.TextDeskripsi}>Rabu</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal</Text>
            <Text style={styles.TextDeskripsi}>08-11-2021</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Flag Keterangan</Text>
            <Text style={styles.TextDeskripsi}>-</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Project</Text>
            <Text style={styles.TextDeskripsi}>PT TREEMAS SOLUSI UTAMA</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi</Text>
            <Text style={{textAlign: 'justify'}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Text style={styles.TextDeskripsi}>09:23:04</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Keluar</Text>
            <Text style={styles.TextDeskripsi}>17:20:35</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Transport</Text>
            <Text style={styles.TextDeskripsi}>0</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Uang Makan</Text>
            <Text style={styles.TextDeskripsi}>0</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailReimburse;

const styles = StyleSheet.create({
  backgroundCardReimburse: {
    backgroundColor: Color.white,
    paddingTop: 50,
    paddingHorizontal: 29,
    flex: 1,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -50,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: 'Poppins-SemiBold',
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
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
  },
  TextDeskripsi: {
    fontFamily: text.light,
    marginVertical: 2,
  },
});
