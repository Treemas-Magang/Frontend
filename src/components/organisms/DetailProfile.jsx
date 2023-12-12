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
import ButtonHome from '../atoms/ButtonHome';
import {useDispatch, useSelector} from 'react-redux';
import {setFormDetailProfile} from '../../redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import CustomTextInputProfile from '../atoms/CustomTextInpuProfile';

const DetailProfile = ({navigation, stylePP}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.DetailProfileReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setFormDetailProfile(inputType, value));
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
        <Text style={styles.Judul}>PROFILE</Text>
      </View>
      <View style={styles.backgroundDetailProfile}>
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
          <View style={{marginBottom: 20, marginTop: 10, alignItems: 'center'}}>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Nama"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Tempat Lahir"
                secureTextEntry={false}
                value={form.catatanApproval}
                multiline
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Tanggal Lahir"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Jenis Kelamin"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Agama"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kewarganegaraan"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kode Post"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Alamat Sekarang"
                secureTextEntry={false}
                value={form.catatanApproval}
                multiline // Set to true for multiline input
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="No HP"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Email"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Jenjang Pendidikan"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Tanggal Bergabung"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Status Kawin"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Golongan Darah"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kontak Darurat"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="No Kontak Darurat"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Status Darurat"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Alamat Darurat"
                secureTextEntry={false}
                value={form.catatanApproval}
                multiline
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="KTP"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="NPWP"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Asuransi"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="KK"
                secureTextEntry={false}
                value={form.catatanApproval}
                onTextChange={value => onChangeText(value, 'catatanApproval')}
              />
            </View>
          </View>
          <View style={{alignItems: 'center', marginBottom: 40}}>
            <TouchableOpacity
              onPress={() => sendData()}
              style={styles.ButtonEdit}>
              <Text
                style={{
                  fontFamily: text.semiBold,
                  fontSize: 16,
                  color: Color.white,
                }}>
                EDIT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonBatal}
              onPress={() => sendData()}>
              <Text style={styles.Text}>BATAL</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailProfile;

const styles = StyleSheet.create({
  backgroundDetailProfile: {
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
  ButtonBatal: {
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
  ButtonEdit: {
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
