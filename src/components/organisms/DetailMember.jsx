/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const DetailMember = ({navigation, stylePP}) => {
  const [isWFH, setIsWFH] = useState(true);
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
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>member Hadir</Text>
      </View>
      <View style={styles.backgroundDetailMember}>
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
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              gap: 5,
              right: 0,
            }}>
            <TouchableOpacity>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/vector/Maps.png')}
              />
            </TouchableOpacity>
            {isWFH ? (
              <TouchableOpacity>
                <FontAwesomeIcon icon={faImage} color={Color.green} size={40} />
              </TouchableOpacity>
            ) : (
              ''
            )}
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
            <Text style={styles.TextTitle}>Project</Text>
            <Text style={styles.TextDeskripsi}>05-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Text style={styles.TextDeskripsi}>09:00:00</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Masuk</Text>
            <Text style={{textAlign: 'justify'}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Telat</Text>
            <Text style={styles.TextDeskripsi}>-</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Keluar</Text>
            <Text style={styles.TextDeskripsi}>Belum Absen Keluar</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Keluar</Text>
            <Text style={{textAlign: 'justify'}}>Belum Absen Keluar</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Pulang Cepat</Text>
            <Text style={styles.TextDeskripsi}>Belum Absen Keluar</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Timesheet</Text>
            <Text style={styles.TextDeskripsi}>Belum Absen Keluar</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailMember;

const styles = StyleSheet.create({
  backgroundDetailMember: {
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
