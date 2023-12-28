/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {useSelector, useDispatch} from 'react-redux';
import {setFormTimesheet} from '../../redux';
import {useRoute} from '@react-navigation/native';

const CardUpdateTimesheet = () => {
  const {tgl} = useRoute().params;
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.TimesheetReducer);
  const [inputKosong, setInputKosong] = useState(false);

  const onChangeText = (value, inputType) => {
    dispatch(setFormTimesheet(inputType, value));
  };

  const sendData = () => {
    if (form.keterangan !== '') {
      setInputKosong(false);
      // await uploadData(formPulang);
      console.log('kirim data : ', form);
    } else {
      setInputKosong(true);
      // console.warn('tidak ada yang boleh form yang kosong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.CardUpdateTimesheet}>
        <Text
          style={{
            fontFamily: text.semiBold,
            color: Color.blue,
            fontSize: 24,
          }}>
          {tgl}
        </Text>
        <CustomTextInput
          label="Keterangan"
          value={form.keterangan}
          textColor={inputKosong ? Color.red : Color.blue}
          style={inputKosong ? styles.fieldSalah : styles.fieldBener}
          onTextChange={value => onChangeText(value, 'keterangan')}
          secureTextEntry={false}
        />
        {inputKosong ? (
          <View>
            <Text style={styles.labelSalah}>Field Tidak Boleh Kosong!</Text>
          </View>
        ) : (
          ''
        )}
        <ButtonAction onPress={() => sendData()} title="UPDATE" />
      </View>
    </View>
  );
};

export default CardUpdateTimesheet;

const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    backgroundColor: Color.white,
    width: 320,
    height: 320,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fieldSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
  },
  fieldBener: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
  },
  labelSalah: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
});
