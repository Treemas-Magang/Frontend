/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ScreenUpdatePassword = ({navigation}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'blue'}}>
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
            // value={form.password}
            // onTextChange={value => onChangeText(value, 'password')}
            maxLength={10}
          />
          <CustomTextInput
            label="Konfirmasi Password"
            type="password"
            // value={form.password}
            // onTextChange={value => onChangeText(value, 'password')}
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
      </ScrollView>
    </KeyboardAvoidingView>
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
