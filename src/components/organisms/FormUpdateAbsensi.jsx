/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
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
import {setUpdateAbsen} from '../../redux';
import axios from 'axios';
import {checkMockLocation} from '../../utils/checkMockLocation';
import {jamSekarang} from '../../utils/jamSekarang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataFromSession} from '../../utils/getDataSession';
import {AlertNotificationSuccess} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';
import {openCamera, openGalerImg} from '../../utils/getPhoto';
import {useRoute} from '@react-navigation/native';
import {API_URL, API_GABUNGAN} from '@env';

const FormUpdateAbsensi = ({navigation}) => {
  const dispatch = useDispatch();
  const {formUpdateMasuk} = useSelector(state => state.UpdateAbsenReducer);
  const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
  const {isWFH} = useSelector(state => state.IsWFHReducer);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [isJarakTerlaluJauh, setIsJarakTerlaluJauh] = useState(false);
  const {jarakTerlaluJauh} = useRoute().params;

  //cek jarak terlalu jauh
  useEffect(() => {
    setIsJarakTerlaluJauh(jarakTerlaluJauh);
  }, []);

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
        dispatch(setUpdateAbsen('photoAbsen', imageData.base64));
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
        dispatch(setUpdateAbsen('photoAbsen', imageData.base64));
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
    dispatch(setUpdateAbsen(inputType, value));
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
            API_GABUNGAN + '/api/absen/update-absen',
            formUpdateMasuk,
            {headers},
          );
          console.log(response.data.success);
          console.log('berhasil absen');
          console.log(uploadBerhasil);
          setUploadBerhasil(true);
          setIsLoading(false);
          //saat berhasil kirim data kosongkan reducer
          dispatch(setUpdateAbsen('namaTempat', ''));
          dispatch(setUpdateAbsen('jarakMsk', ''));
          dispatch(setUpdateAbsen('noteTelatMsk', ''));
          dispatch(setUpdateAbsen('gpsLatitudeMsk', ''));
          dispatch(setUpdateAbsen('gpsLongitudeMsk', ''));
          dispatch(setUpdateAbsen('photoAbsen', ''));
          dispatch(setUpdateAbsen('isWfh', ''));

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
          // dispatch(setUpdateAbsen('namaTempat', ''));
          // dispatch(setUpdateAbsen('jarakMsk', ''));
          // dispatch(setUpdateAbsen('noteTelatMsk', ''));
          // dispatch(setUpdateAbsen('gpsLatitudeMsk', ''));
          // dispatch(setUpdateAbsen('gpsLongitudeMsk', ''));
          // dispatch(setUpdateAbsen('photoAbsen', ''));
          // dispatch(setUpdateAbsen('isWfh', ''));
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

  //fungsi untuk pindah ke dashboard di jalankan setelah berhasil absen dan update
  const toDashboard = () => {
    // navigation.replace('dashboard');
    navigation.reset({
      index: 0,
      routes: [{name: 'dashboard'}],
    });
  };

  const sendData = async () => {
    setIsLoading(true);

    try {
      checkMockLocation();
      console.log('kirim data update : ', formUpdateMasuk);
      await kirimDataAbsensi();
    } catch (error) {
      console.error('Error in sendData:', error);
    }
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
      <Text style={styles.textJudul}>Update Absensi</Text>
      <CustomTextInput
        label="Lokasi Project"
        secureTextEntry={false}
        value={dataProject.namaTempat}
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
        value={formUpdateMasuk.lokasiMsk}
        onTextChange={value => onChangeText(value, 'lokasi')}
      />
      <CustomTextInput
        label="Jarak"
        editable={false}
        secureTextEntry={false}
        value={formUpdateMasuk.jarakMsk}
        onTextChange={value => onChangeText(value, 'jarak')}
      />
      {isWFH > 0 ? (
        <>
          <View style={styles.kotakPreviewKosong}>
            <View style={styles.previewKosong}>
              {base64ImageData === null ? (
                <>
                  {isLoading ? (
                    <ActivityIndicator size="large" color={Color.black} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCamera} size={50} />
                      <Text>Preview</Text>
                    </>
                  )}
                </>
              ) : (
                <TouchableOpacity
                  style={styles.previewKosong}
                  onPress={moveToPreview}>
                  <Image
                    source={{uri: base64ImageData}}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.wrapperButton}>
            <ButtonCamera onPress={openKamera} />
            {/* <ButtonGalery onPress={openGalery} /> */}
            <ButtonGalery onPress={openGalery} />
            <ButtonAction
              title="Update"
              style={{width: 148}}
              onPress={sendData}
            />
          </View>
        </>
      ) : isLoading ? (
        <ButtonLoading />
      ) : isJarakTerlaluJauh ? (
        <ButtonAction title="Jarak terlalu jauh" style={{width: 269}} />
      ) : (
        <ButtonAction title="Update" style={{width: 269}} onPress={sendData} />
      )}
    </View>
  );
};

export default FormUpdateAbsensi;

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
