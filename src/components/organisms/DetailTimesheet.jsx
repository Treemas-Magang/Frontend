/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonAction from '../atoms/ButtonAction';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailTimesheet = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
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
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Detail timesheet</Text>
      </View>
      <View style={styles.backgroundCardTimesheet}>
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
  backgroundCardTimesheet: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('7.5%'),
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
  buttonUpdate: {
    backgroundColor: Color.white,
    padding: 20,
    margin: 8,
    alignItems: 'center',
  },
});
