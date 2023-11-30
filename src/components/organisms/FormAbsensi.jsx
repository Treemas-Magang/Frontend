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
import {AlertNotificationSuccess} from '../atoms/AlertNotification';
import {cekTelatMasuk} from '../../utils/cekJamTelatDanPulangCepat';
import ButtonLoading from '../atoms/ButtonLoading';
import {openCamera, openGalerImg} from '../../utils/getPhoto';

const FormAbsensi = ({navigation}) => {
  const dispatch = useDispatch();
  const {formAbsensi} = useSelector(state => state.FormAbsensiReducer);
  const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
  const {isWFH} = useSelector(state => state.IsWFHReducer);
  const [capturedImage, setCapturedImage] = useState(null);
  const [terlambat, setTerlambat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);

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
            'http://192.168.10.31:8081/api/absen/input-absen',
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
          dispatch(setFormAbsensi('gpsLatitudeMsk', ''));
          dispatch(setFormAbsensi('gpsLongitudeMsk', ''));
          dispatch(setFormAbsensi('photoAbsen', ''));
          dispatch(setFormAbsensi('isWfh', ''));

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
          // dispatch(setFormAbsensi('namaTempat', ''));
          // dispatch(setFormAbsensi('jarakMsk', ''));
          // dispatch(setFormAbsensi('noteTelatMsk', ''));
          // dispatch(setFormAbsensi('gpsLatitudeMsk', ''));
          // dispatch(setFormAbsensi('gpsLongitudeMsk', ''));
          // dispatch(setFormAbsensi('photoAbsen', ''));
          // dispatch(setFormAbsensi('isWfh', ''));
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
      console.log('kirim data : ', formAbsensi);

      if (terlambat && formAbsensi.noteTelatMsk === '') {
        console.log('alasan telat masuk tidak boleh kosong');
        setIsLoading(false);
      } else {
        await kirimDataAbsensi();
      }
    } catch (error) {
      console.error('Error in sendData:', error);
    }
  };

  return (
    <View style={styles.congtainerForm}>
      {uploadBerhasil ? (
        <View style={{position: 'absolute'}}>
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
      <Text style={styles.textJudul}>melakukan absensi</Text>
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
      {terlambat ? (
        <CustomTextInput
          label="Alasan Telat Masuk"
          secureTextEntry={false}
          value={formAbsensi.noteTelatMsk}
          onTextChange={value => onChangeText(value, 'noteTelatMsk')}
        />
      ) : (
        ''
      )}
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
              title="kirim"
              style={{width: 148}}
              onPress={sendData}
            />
          </View>
        </>
      ) : isLoading ? (
        <ButtonLoading
          style={{marginVertical: 10, width: wp('75%'), height: hp('8%')}}
        />
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
