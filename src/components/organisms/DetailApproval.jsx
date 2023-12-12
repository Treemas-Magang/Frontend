/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import ButtonHome from '../atoms/ButtonHome';
import CustomTextInput from '../atoms/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {setFormApproval} from '../../redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import DetailSakitApp from '../molecules/DetailSakitApp';
import DetailLiburApp from '../molecules/DetailLiburApp';
import DetailLemburApp from '../molecules/DetailLemburApp';
import DetailAbsenPulangApp from '../molecules/DetailAbsenPulangApp';
import DetailReimburseApp from '../molecules/DetailReimburseApp';

const DetailApproval = ({navigation, stylePP}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setFormApproval(inputType, value));
  };
  const sendData = () => {
    console.log('kirim data : ', form);
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
        <Text style={styles.Judul}>Approval</Text>
      </View>
      {/* <View style={styles.backgroundDetailApproval}>
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
              <FontAwesomeIcon icon={faImage} color={Color.green} size={40} />
            </TouchableOpacity>
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
            <Text style={styles.TextDeskripsi}>TREEMAS SOLUSI UTAMA</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Text style={styles.TextDeskripsi}>09:00:00</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Masuk</Text>
            <Text style={{textAlign: 'justify', marginBottom: 5}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Telat Masuk</Text>
            <Text style={styles.TextDeskripsi}>-</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Pulang</Text>
            <Text style={styles.TextDeskripsi}>Belum Absen Keluar</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Pulang</Text>
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
          <View>
            <Text style={styles.TextTitle}>Catatan Lupa Pulang</Text>
            <Text style={styles.TextDeskripsi}>Belum Absen Keluar</Text>
          </View>
          <View style={{marginBottom: 20, marginTop: 10}}>
            <CustomTextInput
              label="Catatan Approve"
              secureTextEntry={false}
              value={form.catatanApproval}
              onTextChange={value => onChangeText(value, 'catatanApproval')}
            />
          </View>
          <View style={{alignItems: 'center', marginBottom: 40}}>
            <TouchableOpacity
              onPress={() => sendData()}
              style={styles.ButtonApprove}>
              <Text
                style={{
                  fontFamily: text.semiBold,
                  fontSize: 16,
                  color: Color.white,
                }}>
                APPROVE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonReject}
              onPress={() => sendData()}>
              <Text style={styles.Text}>REJECT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View> */}
      <DetailReimburseApp />
    </View>
  );
};

export default DetailApproval;

const styles = StyleSheet.create({
  backgroundDetailApproval: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
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
  ButtonReject: {
    backgroundColor: 'transparent',
    borderColor: Color.red,
    borderWidth: 2,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonApprove: {
    backgroundColor: Color.green,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.red,
  },
  pp: {
    borderRadius: 200,
  },
});
