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

const DetailMemberCuti = ({navigation, stylePP}) => {
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
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>member cuti</Text>
      </View>
      <View style={styles.backgroundDetailCuti}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <View>
              <Image
                source={require('../../assets/vector/user.png')}
                style={[styles.pp, stylePP]}
                resizeMode="contain"
              />
            </View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nik</Text>
            <Text style={styles.TextDeskripsi}>2912312</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nama</Text>
            <Text style={styles.TextDeskripsi}>Azriel FachrulRezy</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Mulai</Text>
            <Text style={styles.TextDeskripsi}>05-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Selesai</Text>
            <Text style={styles.TextDeskripsi}>08-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Masuk</Text>
            <Text style={styles.TextDeskripsi}>10-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Total Cuti Bersama</Text>
            <Text style={styles.TextDeskripsi}>0</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Total Cuti Khusus</Text>
            <Text style={styles.TextDeskripsi}>0</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Total Cuti (Hari)</Text>
            <Text style={styles.TextDeskripsi}>3</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Keterangan</Text>
            <Text style={styles.TextDeskripsi}>Pulang Kampung</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Alamat Cuti</Text>
            <Text style={styles.TextDeskripsi}>Boyolali</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>User Approval</Text>
            <Text style={styles.TextDeskripsi}>Dede Sunandar</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Approval</Text>
            <Text style={styles.TextDeskripsi}>19-04-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Approval</Text>
            <Text style={styles.TextDeskripsi}>Jangan Lupa Oleh Oleh</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailMemberCuti;

const styles = StyleSheet.create({
  backgroundDetailCuti: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),
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
