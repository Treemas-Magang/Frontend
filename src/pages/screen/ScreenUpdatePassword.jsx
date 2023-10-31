/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setFormUpdatePassword} from '../../redux';
import {useRoute} from '@react-navigation/native';
const ScreenUpdatePassword = ({navigation}) => {
  const route = useRoute();
  const {nik} = route.params;
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.UpdatePasswordReducer);
  const [newPass, setNewPass] = useState('');
  const [konPass, setKonPass] = useState('');

  const sendData = () => {
    if (newPass === '' && konPass === '') {
      console.log('harap isi semua form !!');
    } else if (konPass === '') {
      console.log('tolong isi konfirmasi password');
    } else if (newPass === '') {
      console.log('tolong isi password baru');
    } else if (newPass === konPass && newPass !== null && konPass !== null) {
      dispatch(setFormUpdatePassword('nik', nik));
      dispatch(setFormUpdatePassword('password_baru', newPass));
      dispatch(setFormUpdatePassword('is_chg_pas', '1'));
      navigation.replace('login');
    } else {
      console.log('konfirmasi password tidak cocok !!!');
    }
  };

  console.log('password baru : ', form);
  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={{height: hp('30%'), justifyContent: 'center'}}>
          <Image
            style={{width: wp('80%')}}
            source={require('../../assets/icons/logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={{position: 'relative', gap: 15, height: hp('50%')}}>
          <CustomTextInput
            label="Password"
            type="password"
            value={newPass}
            onTextChange={value => setNewPass(value)}
            maxLength={10}
          />
          <CustomTextInput
            label="Konfirmasi Password"
            type="password"
            value={konPass}
            onTextChange={value => setKonPass(value)}
            maxLength={10}
          />
          <View style={{flexDirection: 'row', gap: 20}}>
            <ButtonAction
              style={{width: 275}}
              onPress={() => sendData()}
              title="UPDATE"
            />
          </View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('20%'),
            position: 'relative',
          }}>
          <Image
            style={styles.vectorKiri}
            source={require('../../assets/vector/VectorKiri.png')}
            resizeMode="contain"
          />
          <Image
            style={styles.vectorKanan}
            source={require('../../assets/vector/VectorKanan.png')}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: hp('98%'),
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Color.white,
  },
  textInfo: {
    textAlign: 'center',
    color: Color.black,
  },
  vectorKiri: {
    position: 'absolute',
    width: wp('25%'),
    bottom: -70,
    left: 0,
    zIndex: -1,
  },
  vectorKanan: {
    position: 'absolute',
    width: wp('35%'),
    bottom: -20,
    right: 0,
    zIndex: -1,
  },
});

export default ScreenUpdatePassword;
