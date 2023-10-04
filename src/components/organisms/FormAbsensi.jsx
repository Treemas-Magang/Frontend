/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonCamera from '../atoms/ButtonCamera';
import ButtonGalery from '../atoms/ButtonGalery';
import ButtonAction from '../atoms/ButtonAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

const FormAbsensi = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [terlambat, setTerlambat] = useState(true);
  return (
    <View style={styles.congtainerForm}>
      <Text style={styles.textJudul}>melakukan absensi</Text>
      <CustomTextInput label="Lokasi Project" secureTextEntry={false} />
      <CustomTextInput label="Waktu" secureTextEntry={false} />
      <CustomTextInput
        label="Lokasi"
        secureTextEntry={false}
        multiline={true}
        style={styles.textArea}
        editable={false}
      />
      <CustomTextInput label="Jarak" secureTextEntry={false} />
      <View style={styles.kotakPreviewKosong}>
        <View style={styles.previewKosong}>
          {capturedImage === null ? (
            <>
              <FontAwesomeIcon icon={faCamera} size={50} />
              <Text>Preview</Text>
            </>
          ) : (
            <Image
              source={{uri: capturedImage.uri}}
              style={{height: '100%', width: '100%', borderRadius: 10}}
            />
          )}
        </View>
      </View>
      {terlambat ? (
        <CustomTextInput label="Alasan Telat Masuk" secureTextEntry={false} />
      ) : (
        ''
      )}
      <View style={styles.wrapperButton}>
        <ButtonCamera onImageCapture={image => setCapturedImage(image)} />
        <ButtonGalery onImageGalery={image => setCapturedImage(image)} />
        <ButtonAction title="kirim" style={{width: 148}} />
      </View>
    </View>
  );
};

export default FormAbsensi;

const styles = StyleSheet.create({
  congtainerForm: {
    width: 320,
    paddingVertical: 20,
    backgroundColor: Color.white,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  kotakPreviewKosong: {
    width: 275,
    height: 161,
    backgroundColor: Color.grey,
    borderRadius: 10,
  },
  wrapperButton: {flexDirection: 'row', gap: 10},
  previewKosong: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
