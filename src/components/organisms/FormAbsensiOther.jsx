/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
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
import {jamSekarang} from '../../utils/jamSekarang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataFromSession} from '../../utils/getDataSession';
import {AlertNotificationDanger, AlertNotificationSuccess} from '../atoms/AlertNotification';
import {cekTelatMasuk} from '../../utils/cekJamTelatDanPulangCepat';
import ButtonLoading from '../atoms/ButtonLoading';
import {openCamera, openGalerImg} from '../../utils/getPhoto';
import {API_GABUNGAN} from '@env';
const FormAbsensiOther = ({navigation}) => {
  const dispatch = useDispatch();
  const {formAbsensi} = useSelector(state => state.FormAbsensiReducer);
  const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
  const {isWFH} = useSelector(state => state.IsWFHReducer);
  const [capturedImage, setCapturedImage] = useState(null);
  const [terlambat, setTerlambat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [inputKosong, setInputKosong] = useState(false);
  const [gagalServer, setGagalServer] = useState(false);
  //simpan data image jadi base64
  let base64ImageData = null;
  if (capturedImage && capturedImage.base64 && capturedImage.fileSize) {
    base64ImageData = `data:image/jpeg;base64,${capturedImage.base64}`;
    console.log('ini file size : ', capturedImage.fileSize);
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }

  //memanggil fungsi openKamera untuk mengambil foto lewat kamera
  const openKamera = () => {
    setCapturedImage(null);
    setIsLoading(true);
    openCamera()
      .then(imageData => {
        //tanganin saat berhasil dapat data
        setCapturedImage(imageData);
        dispatch(setFormAbsensi('photoAbsen', imageData.base64));
        setIsLoading(false);
      })
      .catch(error => {
        // Tangani kesalahan
        setIsLoading(false);
        // console.error(error);
      });
  };

  //memanggil fungsi openGalery untuk mengambil foto lewat galery
  const openGalery = () => {
    setCapturedImage(null);
    setIsLoading(true);
    openGalerImg()
      .then(imageData => {
        //tanganin saat berhasil dapat data
        setCapturedImage(imageData);
        dispatch(setFormAbsensi('photoAbsen', imageData.base64));
        setIsLoading(false);
      })
      .catch(error => {
        // Tangani kesalahan
        setIsLoading(false);
        // console.error(error);
      });
  };

  //fungsi untuk melihat preview foto secara full di screen previewPhoto
  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
  };

  //fungsi untuk menangkap perubahan pada InputText lalu mengirim ke reducer
  const onChangeText = (value, inputType) => {
    dispatch(setFormAbsensi(inputType, value));
  };

  //fungsi untuk menangani saat mau mengirim data Absen
    const kirimDataAbsensi = async () => {
      try {
        //mengambil token untuk otorisasi
        const token = await getDataFromSession('token');
        if (token !== null) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          try {
            //melakukan hit ke API untuk kirim data Absen
            const response = await axios.post(
              API_GABUNGAN + '/api/absen/input-absen',
              formAbsensi,
              {headers},
            );
            console.log(response.data.success);
            console.log('berhasil absen');
            console.log(uploadBerhasil);
            setUploadBerhasil(true);
            setIsLoading(false);
            //saat berhasil kirim data kosongkan reducer
            dispatch(setFormAbsensi('namaTempat', ''));
            dispatch(setFormAbsensi('jarakMsk', ''));
            dispatch(setFormAbsensi('noteTelatMsk', ''));
            dispatch(setFormAbsensi('gpsLatitudeMsk', null));
            dispatch(setFormAbsensi('gpsLongitudeMsk', null));
            dispatch(setFormAbsensi('photoAbsen', ''));
            dispatch(setFormAbsensi('isWfh', '0'));

            // navigation.replace('dashboard');
            try {
              await AsyncStorage.setItem('sudah_absen', 'true');
              console.log('berhasil menyimpan status sudah absen');
            } catch (error) {
              console.log('gagal menyimpan status sudah absen', error);
            }
          } catch (error) {
            console.log(error.response);
            const errorCode = error.response.status;
            //saat gagal kirim data kosongkan reducer
            dispatch(setFormAbsensi('namaTempat', ''));
            dispatch(setFormAbsensi('jarakMsk', ''));
            dispatch(setFormAbsensi('noteTelatMsk', ''));
            dispatch(setFormAbsensi('gpsLatitudeMsk', null));
            dispatch(setFormAbsensi('gpsLongitudeMsk', null));
            dispatch(setFormAbsensi('photoAbsen', ''));
            dispatch(setFormAbsensi('isWfh', '0'));
            switch (errorCode) {
              case 403:
                console.log('project tidak tepat');
                setIsLoading(false);
                break;
              case 404:
                setIsLoading(false);
                break;
              case 500:
                setIsLoading(false);
                console.log('Kesalahan server');
                setGagalServer(true);
                break;
              default:
                setIsLoading(false);
                console.log(error.response);
                console.log('gagal absen');
                break;
            }
          }
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

  //kondisi telat masuk
  useEffect(() => {
    const cekTelat = cekTelatMasuk(dataProject.jamMasuk);
    console.log('cek telat', cekTelat);
    setTerlambat(cekTelat);
  }, [dataProject]);
  //kondisi wfh
  useEffect(() => {
    dispatch(setFormAbsensi('isWfh', isWFH));
  }, [dispatch, isWFH]);

  //fungsi untuk pindah ke dashboard di jalankan setelah berhasil absen dan update
  const toDashboard = () => {
    navigation.replace('dashboard');
  };

  const sendData = async () => {
    setIsLoading(true);

    try {
      checkMockLocation();
      if (formAbsensi.noteOther === '') {
        console.log('alasan telat masuk tidak boleh kosong');
        setInputKosong(true);
        setIsLoading(false);
      } else {
        setInputKosong(false);
        console.log('kirim data : ', formAbsensi);
        await kirimDataAbsensi();
      }
    } catch (error) {
      console.error('Error in sendData:', error);
    }
  };
    const btnCancel = () => {
      setGagalServer(false);
    };

  return (
    <View style={styles.congtainerForm}>
      {uploadBerhasil ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Berhasil Melakukan Absen"
            titleAlert="Success"
            onPress={toDashboard}
          />
        </View>
      ) : (
        ''
      )}
      {gagalServer ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationDanger
            buttonAlert="Close"
            textBodyAlert="Server Error"
            titleAlert="Success"
            onPress={() => btnCancel()}
          />
        </View>
      ) : (
        ''
      )}
      <Text style={styles.textJudul}>melakukan absensi</Text>
      <CustomTextInput
        label="Lokasi Project"
        secureTextEntry={false}
        value="Other"
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
        label="Keterangan Other"
        secureTextEntry={false}
        value={formAbsensi.noteOther}
        textColor={inputKosong ? Color.red : Color.blue}
        style={inputKosong ? styles.fieldSalah : styles.fieldBener}
        onTextChange={value => onChangeText(value, 'noteOther')}
        maxLength={25}
      />
      {inputKosong ? (
        <Text style={styles.labelSalah}>Field Tidak Boleh Kosong!</Text>
      ) : (
        ''
      )}
      {isLoading ? (
        <ButtonLoading />
      ) : (
        <ButtonAction title="kirim" style={{width: 269}} onPress={sendData} />
      )}
    </View>
  );
};

export default FormAbsensiOther;

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
  labelSalah: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
  fieldSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  fieldBener: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
});
