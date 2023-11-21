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
import {getTanggalSekarang} from '../../utils/getTanggalSekarang';
import {checkMockLocation} from '../../utils/checkMockLocation';
import {useRoute} from '@react-navigation/native';
import {jamSekarang} from '../../utils/jamSekarang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataFromSession} from '../../utils/getDataSession';

const FormAbsensi = ({navigation}) => {
  const {namaTempat} = useRoute().params;
  const dispatch = useDispatch();
  const {formAbsensi} = useSelector(state => state.FormAbsensiReducer);
  console.log(formAbsensi);
  const [isWFH, setIsWFH] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [terlambat, setTerlambat] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {date, time, dayName} = getTanggalSekarang();
    console.log('tanggal : ', date);
    console.log('hari : ', dayName);
    console.log('waktu : ', time);
    // dispatch(setFormAbsensi('nik', '999'));
    // dispatch(setFormAbsensi('foto', capturedImage));
  }, [dispatch, capturedImage]);
  const onChangeText = (value, inputType) => {
    dispatch(setFormAbsensi(inputType, value));
  };

  useEffect;
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

  const kirimDataAbsensi = async () => {
    try {
      const token = await getDataFromSession('token');

      if (token !== null) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .post(
            'http://192.168.10.31:8081/api/absen/input-absen',
            formAbsensi,
            {headers},
          )
          .then(res => {
            if (res.data.success) {
              console.log('berhasil absen');
              navigation.replace('dashboard');
              try {
                AsyncStorage.setItem('sudah_absen', 'true');
                console.log('berhasil menyimpan status sudah absen');
              } catch (error) {
                console.log('gagal menyimpan status sudah absen', error);
              }
            } else {
              console.log('gagal absen');
            }
          })
          .catch(error => console.log('gagal absen'));

        // const response = await axios.post(
        //   'http://192.168.10.31:8081/api/absen/input-absen',
        //   formAbsensi,
        //   {headers},
        // );

        // if (response.success) {
        //   console.log('message berhasil : ', response);
        //   // try {
        //   //   await AsyncStorage.setItem('sudah_absen', 'true');
        //   //   console.log('berhasil menyimpan status sudah absen');
        //   // } catch (error) {
        //   //   console.log('gagal menyimpan status sudah absen', error);
        //   // }
        // } else {
        //   console.log('message gagal : ', response);
        //   // try {
        //   //   await AsyncStorage.setItem('sudah_absen', 'false');
        //   //   console.log('berhasil menyimpan status sudah absen');
        //   // } catch (error) {
        //   //   console.log('gagal menyimpan status sudah absen', error);
        //   // }
        // }
      } else {
        console.log('Data tidak ditemukan di session.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const sudahAbsen = async () => {
    await kirimDataAbsensi();
  };

  const sendData = async () => {
    try {
      // checkMockLocation();
      console.log('kirim data : ', formAbsensi);
      // await kirimDataDanFotoKeAPI(); // Uncomment if kirimDataDanFotoKeAPI is an asynchronous function
      await sudahAbsen();
      // .then(() => {
      //   try {
      //     AsyncStorage.setItem('sudah_absen', 'true');
      //     console.log('berhasil menyimpan status sudah absen');
      //   } catch (error) {
      //     console.log('gagal menyimpan status sudah absen', error);
      //   }
      // })
      // .catch(() => {
      //   try {
      //     AsyncStorage.setItem('sudah_absen', 'false');
      //     console.log('berhasil menyimpan status sudah absen');
      //   } catch (error) {
      //     console.log('gagal menyimpan status sudah absen', error);
      //   }
      // });
    } catch (error) {
      console.error('Error in sendData:', error);
    }
  };

  return (
    <View style={styles.congtainerForm}>
      <Text style={styles.textJudul}>melakukan absensi</Text>
      <CustomTextInput
        label="Lokasi Project"
        secureTextEntry={false}
        value={namaTempat}
        onTextChange={value => onChangeText(value, 'lokasi_project')}
        editable={false}
      />
      <CustomTextInput
        label="Waktu"
        secureTextEntry={false}
        value={jamSekarang()}
        editable={false}
      />
      <CustomTextInput
        label="Lokasi"
        secureTextEntry={false}
        multiline={true}
        style={styles.textArea}
        editable={false}
        value={formAbsensi.lokasiMsk}
        onTextChange={value => onChangeText(value, 'lokasi')}
      />
      <CustomTextInput
        label="Jarak"
        editable={false}
        secureTextEntry={false}
        value={formAbsensi.jarakMsk}
        onTextChange={value => onChangeText(value, 'jarak')}
      />
      {isWFH ? (
        <>
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
            <CustomTextInput
              label="Alasan Telat Masuk"
              secureTextEntry={false}
              value={formAbsensi.alasan_telat_masuk}
              onTextChange={value => onChangeText(value, 'alasan_telat_masuk')}
            />
          ) : (
            ''
          )}

          <View style={styles.wrapperButton}>
            <ButtonCamera onImageCapture={image => setCapturedImage(image)} />
            <ButtonGalery onImageGalery={image => setCapturedImage(image)} />
            <ButtonAction
              title="kirim"
              style={{width: 148}}
              onPress={sendData}
            />
          </View>
        </>
      ) : (
        <ButtonAction title="kirim" style={{width: 269}} onPress={sendData} />
      )}
    </View>
  );
};

export default FormAbsensi;

const styles = StyleSheet.create({
  congtainerForm: {
    width: 320,
    marginTop: 30,
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
