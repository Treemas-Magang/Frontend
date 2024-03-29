/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../atoms/ButtonAction';

const FormBelumAbsenPulang = () => {
  return (
    <View style={styles.FormBelumAbsenPulang}>
      <View style={styles.cardFormBelumAbsenPulang}>
        <Text style={styles.textJudul}>Absen Pulang</Text>
        <CustomTextInput
          label="Tanggal"
          secureTextEntry={false}
          editable={false}
        />
        <CustomTextInput
          label="Lokasi"
          secureTextEntry={false}
          multiline={true}
          style={styles.textArea}
          editable={false}
        />
        <CustomTextInput label="Catatan Lupa Absen" secureTextEntry={false} />
        <CustomTextInput label="Jam Pulang" secureTextEntry={false} />
        <CustomTextInput label="Timesheet" secureTextEntry={false} />
        <CustomTextInput
          label="Jarak"
          secureTextEntry={false}
          editable={false}
        />
        <View style={styles.wrapperButton}>
          <ButtonAction title="kirim" style={{width: 269}} />
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
