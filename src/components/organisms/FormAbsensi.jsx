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
import { AlertNotificationSuccess } from '../atoms/AlertNotification';
import { cekTelatMasuk } from '../../utils/cekJamTelatDanPulangCepat';
import ButtonLoading from '../atoms/ButtonLoading';

const FormAbsensi = ({navigation}) => {
  const {namaTempat, jamMasuk, jamKeluar} = useRoute().params;
  console.log('jam masuk: ', jamMasuk)
  const dispatch = useDispatch();
  const {formAbsensi} = useSelector(state => state.FormAbsensiReducer);
  console.log(formAbsensi);
  const [isWFH, setIsWFH] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [terlambat, setTerlambat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);

  useEffect(() => {
    const {date, time, dayName} = getTanggalSekarang();
    console.log('tanggal : ', date);
    console.log('hari : ', dayName);
    console.log('waktu : ', time);
    // dispatch(setFormAbsensi('foto', capturedImage));
  }, [dispatch, capturedImage]);
  const onChangeText = (value, inputType) => {
    dispatch(setFormAbsensi(inputType, value));
  };
  const kirimDataAbsensi = async () => {
  try {
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
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

        // navigation.replace('dashboard');
        try {
          await AsyncStorage.setItem('sudah_absen', 'true');
          console.log('berhasil menyimpan status sudah absen');
        } catch (error) {
          console.log('gagal menyimpan status sudah absen', error);
        }
      } catch (error) {
        console.log(error.response);
        const errorCode = error.response ? error.response.code : null;

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
  const cekTelat = cekTelatMasuk(jamMasuk);
  console.log('cek telat', cekTelat);
  setTerlambat(cekTelat);
}, [jamMasuk]);

  const toDashboard = () => {
    navigation.replace('dashboard');
  };
  const sudahAbsen = async () => {
    await kirimDataAbsensi();
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
        await sudahAbsen();
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
              value={formAbsensi.noteTelatMsk}
              onTextChange={value => onChangeText(value, 'noteTelatMsk')}
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
        isLoading ? (
          <ButtonLoading />
        ) : (
        <ButtonAction title="kirim" style={{width: 269}} onPress={sendData} />
        )
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
