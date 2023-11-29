import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const DetailAbsen = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Detail Absen</Text>
      </View>
      <View style={styles.backgroundCardAbsen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.TextTitle}>Nik</Text>
            <Text style={styles.TextDeskripsi}>2912312</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nama</Text>
            <Text style={styles.TextDeskripsi}>Azriel FachrulRezy</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Hari</Text>
            <Text style={styles.TextDeskripsi}>Senin</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal</Text>
            <Text style={styles.TextDeskripsi}>08-11-2021</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Fleg Keterangan</Text>
            <Text style={styles.TextDeskripsi}>ABSEN</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Project</Text>
            <Text style={styles.TextDeskripsi}>PT TREEMAS SOLUSI UTAMA</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Text style={styles.TextDeskripsi}>09:23:04</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Telat</Text>
            <Text style={styles.TextDeskripsi}>BARU ABSEN MASUK</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Masuk</Text>
            <Text style={{textAlign: 'justify'}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Pulang</Text>
            <Text style={styles.TextDeskripsi}>17:20:35</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Pulang Cepat</Text>
            <Text style={styles.TextDeskripsi}>Kegiatan Penting</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Pulang</Text>
            <Text style={{textAlign: 'justify', marginBottom: 25}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailAbsen;

const styles = StyleSheet.create({
  backgroundCardAbsen: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('11%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6.5%'),
    color: Color.blue,
    textTransform: 'uppercase',
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
