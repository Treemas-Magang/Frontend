/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../atoms/ButtonAction';
import ButtonTime from '../atoms/ButtonTime';
import { useDispatch, useSelector } from 'react-redux';
import { setFormLupaAbsenPulang } from '../../redux';
import FakeTextInput from '../atoms/FakeTextInput';
import { useRoute } from '@react-navigation/native';

const FormBelumAbsenPulang = () => {
  const {lokasi, tanggal} = useRoute().params;
  const dispatch = useDispatch();
  const {form_lupa_absen_pulang} = useSelector(
    state => state.FormLupaAbsenPulangReducer,
  );
  const [time, setTime] = useState('');
    console.log(time)
  useEffect(() => {
    dispatch(setFormLupaAbsenPulang('jamPlg', time));
    dispatch(setFormLupaAbsenPulang('jarak', '8 meter'));
  }, [dispatch, time]);

  const onChangeText = (value, inputType) => {
    dispatch(setFormLupaAbsenPulang(inputType, value));
  };
  const sendData = () => {
    console.log('data yang di kirim : ', form_lupa_absen_pulang);
  }
  return (
    <View style={styles.FormBelumAbsenPulang}>
      <View style={styles.cardFormBelumAbsenPulang}>
        <Text style={styles.textJudul}>Absen Pulang</Text>
        <CustomTextInput
          label="Tanggal"
          secureTextEntry={false}
          editable={false}
          value={tanggal}
        />
        <CustomTextInput
          label="Lokasi"
          secureTextEntry={false}
          multiline={true}
          style={styles.textArea}
          editable={false}
          value={lokasi}
        />
        <View style={{position: 'relative'}}>
          {/* <CustomTextInput
            label="Jam Pulang"
            value={time}
            secureTextEntry={false}
            editable={false}
          /> */}
          <FakeTextInput
            value={
              form_lupa_absen_pulang.jamPlg !== ''
                ? `${form_lupa_absen_pulang.jamPlg}`
                : '-'
            }
            label="Jam Pulang"
            // textColor={inputKosong ? Color.red : Color.blue}
            // style={inputKosong ? styles.fieldSalah : styles.fieldBener}
            // dataKosong={inputKosong}
          />
          <ButtonTime
            style={{position: 'absolute', right: 10, top: 12}}
            onData={data => setTime(data)}
          />
        </View>
        <CustomTextInput
          label="Catatan Lupa Absen"
          secureTextEntry={false}
          value={form_lupa_absen_pulang.catatanLupaPulang}
          onTextChange={value => onChangeText(value, 'catatanLupaPulang')}
        />
        <CustomTextInput
          label="Timesheet"
          secureTextEntry={false}
          value={form_lupa_absen_pulang.timesheet}
          onTextChange={value => onChangeText(value, 'timesheet')}
        />
        <CustomTextInput
          label="Jarak"
          secureTextEntry={false}
          editable={false}
          value={form_lupa_absen_pulang.jarak}
        />
        <View style={styles.wrapperButton}>
          <ButtonAction title="kirim" style={{width: 269}} onPress={sendData} />
        </View>
      </View>
    </View>
  );
};

export default FormBelumAbsenPulang;

const styles = StyleSheet.create({
  FormBelumAbsenPulang: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  cardFormBelumAbsenPulang: {
    width: 320,
    paddingVertical: 15,
    backgroundColor: Color.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 50,
  },
  textJudul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    textTransform: 'uppercase',
    color: Color.blue,
  },
  textArea: {
    width: 275,
    height: 100,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    color: Color.text,
    paddingBottom: -10,
  },
});
