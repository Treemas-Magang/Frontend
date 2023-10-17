/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonCamera from '../atoms/ButtonCamera';
import ButtonGalery from '../atoms/ButtonGalery';
import ButtonAction from '../atoms/ButtonAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setFormAbsensi} from '../../redux';
import axios from 'axios';

const FormAbsensi = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.FormAbsensiReducer);
  console.log(form)
  const [capturedImage, setCapturedImage] = useState(null);
  const [terlambat, setTerlambat] = useState(true);

  useEffect(() => {
    dispatch(setFormAbsensi('lokasi', 'sdkaas kasdkas asdjasdn asdnasdkn asdnasdasm dasndkasn asndknasds asdnasdnaskn nwdjanjd msdn mwnd ndnwkd kndkn'));
    dispatch(setFormAbsensi('jarak', 20.0202));
    dispatch(setFormAbsensi('lokasi_project', 'PT. TREEMAS SOLUSI UTAMA'));
    dispatch(setFormAbsensi('nik', '999'));
    dispatch(setFormAbsensi('waktu', '09:00'));
    dispatch(setFormAbsensi('foto', capturedImage))
  }, [dispatch, capturedImage]);
  const onChangeText = (value, inputType) => {
    dispatch(setFormAbsensi(inputType, value));
  };

// Fungsi untuk mengirim data dan foto ke API
// const kirimDataDanFotoKeAPI = async () => {
//   try {
//     const formData = new FormData();
    // formData.append('nik', form.nik);
    // formData.append('lokasi_project', form.lokasi_project);
    // formData.append('waktu', form.waktu);
    // formData.append('lokasi', form.lokasi);
    // formData.append('jarak', form.jarak);
    // formData.append('alasan_telat_masuk', form.alasan_telat_masuk);
    // Tambahkan foto ke FormData
//     formData.append('foto', {
//       uri: form.foto.uri, // Lokasi file foto
//       type: form.foto.type, // Tipe konten foto
//       name: form.foto.fileName, // Nama file
//     });

//     const response = await axios.post('http://192.168.10.31:8081/absen/absen-proof/?nik=999', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Proses respons dari API jika diperlukan
//     console.log('Respon dari API:', response.data);

//   } catch (error) {
//     // Tangani kesalahan jika terjadi
//     console.error('Kesalahan:', error);
//   }
// };

  const sendData = () => {
    console.log('kirim data : ', form);
    // kirimDataDanFotoKeAPI();
  };
  return (
    <View style={styles.congtainerForm}>
      <Text style={styles.textJudul}>melakukan absensi</Text>
      <CustomTextInput
        label="Lokasi Project"
        secureTextEntry={false}
        value={form.lokasi_project}
        onTextChange={value => onChangeText(value, 'lokasi_project')}
      />
      <CustomTextInput
        label="Waktu"
        secureTextEntry={false}
        value={form.waktu}
        onTextChange={value => onChangeText(value, 'waktu')}
      />
      <CustomTextInput
        label="Lokasi"
        secureTextEntry={false}
        multiline={true}
        style={styles.textArea}
        editable={false}
        value={form.lokasi}
        onTextChange={value => onChangeText(value, 'lokasi')}
      />
      <CustomTextInput
        label="Jarak"
        secureTextEntry={false}
        value={form.jarak}
        onTextChange={value => onChangeText(value, 'jarak')}
      />
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
        <CustomTextInput label="Alasan Telat Masuk" secureTextEntry={false}  value={form.alasan_telat_masuk} onTextChange={value => onChangeText(value, 'alasan_telat_masuk')} />
      ) : (
        ''
      )}
      <View style={styles.wrapperButton}>
        <ButtonCamera onImageCapture={image => setCapturedImage(image)} />
        <ButtonGalery onImageGalery={image => setCapturedImage(image)} />
        <ButtonAction title="kirim" style={{width: 148}} onPress={sendData} />
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
