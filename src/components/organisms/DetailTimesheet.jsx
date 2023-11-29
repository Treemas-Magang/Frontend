// /* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import ButtonAction from '../atoms/ButtonAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const DetailTimesheet = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />

      <View style={styles.containerJudul}>
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>Timesheet</Text>
      </View>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Hari
            </Text>
            <Text style={{fontFamily: text.light}}>Senin</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Tanggal
            </Text>
            <Text style={{fontFamily: text.light}}>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Project
            </Text>
            <Text style={{fontFamily: text.light}}>
              PT TREEMAS SOLUSI UTAMA
            </Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Lokasi
            </Text>
            <Text style={{textAlign: 'justify', fontFamily: text.light}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Keterangan
            </Text>
            <Text style={{fontFamily: text.light}}>Mobile Absensi I</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Jam Masuk
            </Text>
            <Text style={{fontFamily: text.light}}>09:23:04</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Jam Keluar
            </Text>
            <Text style={{fontFamily: text.light}}>17:20:35</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Reguler Hours
            </Text>
            <Text style={{fontFamily: text.light}}>7</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Overtime
            </Text>
            <Text style={{fontFamily: text.light}}>-</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text style={{fontFamily: text.light}}>7</Text>
          </View>
        </ScrollView>
        <View style={styles.buttonUpdate}>
          <ButtonAction
            onPress={() => moveTo('formUpdateTimesheet')}
            title="UPDATE"
          />
        </View>
      </View>
    </View>
  );
};

export default DetailTimesheet;

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
  buttonUpdate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Color.white,
    borderColor: Color.black,
    width: wp('80%'),
    minHeight: hp('10%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: 10,
  },
  content: {
    backgroundColor: Color.white,
    flex: 5,
    position: 'relative',
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 35,
    paddingHorizontal: 15,
  },
  containerJudul: {
    flex: 1,
    justifyContent: 'center',
  },
});
