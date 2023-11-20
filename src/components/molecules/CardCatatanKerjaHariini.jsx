/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {useSelector, useDispatch} from 'react-redux';
import {setFormCatatanKerja} from '../../redux';

const CardCatatanKerjaHariini = () => {
  const [pulangCepat, setPulangCepat] = useState(false);
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanKerjaReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setFormCatatanKerja(inputType, value));
  };

  const sendData = () => {
    console.log('kirim data : ', form);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-500}
      style={styles.container}>
      <View style={styles.CardCatatanKerja}>
        <Text
          style={{
            fontFamily: text.semiBold,
            color: Color.blue,
            fontSize: 24,
            textTransform: 'uppercase',
          }}>
          Catatan Kerja Hari Ini
        </Text>
        <CustomTextInput
          label="Timesheet"
          value={form.keterangan}
          onTextChange={value => onChangeText(value, 'timesheet')}
          secureTextEntry={false}
        />
        {pulangCepat ? (
          <CustomTextInput
            label="Catan Pulang Cepat"
            value={form.keterangan}
            onTextChange={value => onChangeText(value, 'catatanPulangKerja')}
            secureTextEntry={false}
          />
        ) : (
          ''
        )}

        <ButtonAction onPress={() => sendData()} title="KIRIM" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CardCatatanKerjaHariini;

const styles = StyleSheet.create({
  CardCatatanKerja: {
    backgroundColor: Color.white,
    width: 320,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 20,
  },
});
