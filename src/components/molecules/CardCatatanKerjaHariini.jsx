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
      <Image
        style={
          pulangCepat
            ? styles.VectorAtasKebalikFalse
            : styles.VectorAtasKebalikTrue
        }
        source={require('../../assets/vector/VectorAtasKebalik.png')}
      />
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
            label="Catan Pulang Kerja"
            value={form.keterangan}
            onTextChange={value => onChangeText(value, 'catatanPulangKerja')}
            secureTextEntry={false}
          />
        ) : (
          ''
        )}

        <ButtonAction onPress={() => sendData()} title="KIRIM" />
      </View>
      <Image
        style={pulangCepat ? styles.VectorBawahFalse : styles.VectorBawahTrue}
        source={require('../../assets/vector/VectorBawah.png')}
      />
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
  VectorBawahFalse: {
    position: 'absolute',
    bottom: -277,
    left: -36,
    zIndex: -1,
    width: '100%',
  },
  VectorBawahTrue: {
    position: 'absolute',
    bottom: -320,
    left: -36,
    zIndex: -1,
    width: '100%',
  },
  VectorAtasKebalikFalse: {
    position: 'absolute',
    top: -199,
    left: -36,
    zIndex: -1,
    width: '100%',
  },
  VectorAtasKebalikTrue: {
    position: 'absolute',
    top: -250,
    left: -36,
    zIndex: -1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 20,
  },
});
