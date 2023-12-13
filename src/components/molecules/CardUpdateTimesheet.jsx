/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React from 'react';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {useSelector, useDispatch} from 'react-redux';
import {setFormTimesheet} from '../../redux';

const CardUpdateTimesheet = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.TimesheetReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setFormTimesheet(inputType, value));
  };

  const sendData = () => {
    if (form.keterangan !== '') {
      // await uploadData(formPulang);
    } else {
      console.warn('tidak ada yang boleh form yang kosong');
    }
    console.log('kirim data : ', form);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-500}
      style={styles.container}>
      <View style={styles.CardUpdateTimesheet}>
        <Text
          style={{
            fontFamily: text.semiBold,
            color: Color.blue,
            fontSize: 24,
          }}>
          08-11-2021
        </Text>
        <CustomTextInput
          label="Keterangan"
          value={form.keterangan}
          onTextChange={value => onChangeText(value, 'keterangan')}
          secureTextEntry={false}
        />
        <ButtonAction onPress={() => sendData()} title="UPDATE" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CardUpdateTimesheet;

const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    backgroundColor: Color.white,
    width: 320,
    height: 288,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
