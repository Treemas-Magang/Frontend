/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../atoms/ButtonAction';
import ButtonTime from '../atoms/ButtonTime';
import {useDispatch, useSelector} from 'react-redux';
import {setFormLupaAbsenPulang} from '../../redux';
import FakeTextInput from '../atoms/FakeTextInput';
import {useRoute} from '@react-navigation/native';
import {getDataFromSession} from '../../utils/getDataSession';
import {hitungJarak} from '../../utils/hitungJarak';
import axios from 'axios';
import {API_URL, API_GABUNGAN} from '@env';
import {AlertNotificationSuccess} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';

const FormBelumAbsenPulang = ({navigation}) => {
  const {lokasi, tanggal, latProj, lonProj, idAbsen} = useRoute().params;
  console.log('latProj : ', latProj);
  console.log('lonProj : ', lonProj);
  const dispatch = useDispatch();
  const {form_lupa_absen_pulang} = useSelector(
    state => state.FormLupaAbsenPulangReducer,
  );
  const [time, setTime] = useState('');
  const [latUser, setLatUser] = useState(null);
  const [lonUser, setLonUser] = useState(null);
  const [lewatmaxJarak, setLewatmaxJarak] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  console.log(time);
  useEffect(() => {
    dispatch(setFormLupaAbsenPulang('jamPlg', time));
    dispatch(setFormLupaAbsenPulang('lokasiPlg', lokasi));
  }, [dispatch, time, lokasi]);

  useEffect(() => {
    getDataFromSession('latLokasiUser')
      .then(data => {
        console.log('latLokasiUser : ', data);
        setLatUser(parseFloat(data));
        dispatch(setFormLupaAbsenPulang('gpsLatitudePlg', parseFloat(data)));
      })
      .catch(error =>
        console.error('gagal ambil data storage latLokasiUser', error),
      );
    getDataFromSession('lonLokasiUser')
      .then(data => {
        console.log('lonLokasiUser : ', data);
        setLonUser(parseFloat(data));
        dispatch(setFormLupaAbsenPulang('gpsLongitudePlg', parseFloat(data)));
      })
      .catch(error =>
        console.error('gagal ambil data storage lonLokasiUser', error),
      );
  }, [dispatch]);

  useEffect(() => {
    if (latProj && lonProj && latUser && lonUser) {
      const distance = hitungJarak(latProj, lonProj, latUser, lonUser);
      const jarakMeter = distance;
      const jarakBulat = Math.ceil(jarakMeter);
      console.log(`Jaratara kedua titik adalah ${jarakMeter} meter.`);
      console.log(`Jarak antara kedua titik adalah ${jarakBulat} meter.`);
      dispatch(setFormLupaAbsenPulang('jarakPlg', `${jarakBulat} meter`));
      if (jarakBulat > 100) {
        setLewatmaxJarak(true);
      }
      // dispatch(setAbsenPulang('jarakPlg', `${jarakBulat} meter`));
      // if (isOther === '1') {
      //   dispatch(setFormAbsensi('jarakMsk', ''));
      //   dispatch(setAbsenPulang('jarakPlg', ''));
      // }
      //jarak user ke kantor 100 = 100 meter
      // const jarakMaxMasuk = parseInt(dataProject.jrkMax);
      // console.log('jarak max masuk : ', jarakMaxMasuk);
      // if (isWFH !== '1' && isAbsen !== 'false' && isOther !== '1') {
      //   if (jarakBulat > jarakMaxMasuk) {
      //     Alert.alert(
      //       'Peringatan',
      //       `Jarak anda ( ${jarakBulat} ) meter dari lokasi project.\njarak terjauh absen dari lokasi adalah\n( ${jarakMaxMasuk} ) meter.`,
      //       [
      //         {
      //           text: 'Kembali',
      //           onPress: () => {
      //             navigation.navigate('dashboard');
      //           },
      //         },
      //       ],
      //     );
      //   }
      // }
    } else {
      console.log('Salah satu lokasi tidak valid, jarak tidak dapat dihitung.');
    }
  }, [dispatch, latProj, latUser, lonProj, lonUser]);

  const kirimDataLupaAbsenPulang = async () => {
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
            API_GABUNGAN + '/api/absen/input-absen-belum-pulang?id=' + idAbsen,
            form_lupa_absen_pulang,
            {headers},
          );
          console.log(response);
          console.log('berhasil mengirim form lupa absen pulang');
          console.log(uploadBerhasil);
          setUploadBerhasil(true);
          setIsLoading(false);
          //saat berhasil kirim data kosongkan reducer
          dispatch(setFormLupaAbsenPulang('jarakPlg', ''));
          dispatch(setFormLupaAbsenPulang('gpsLatitudePlg', null));
          dispatch(setFormLupaAbsenPulang('gpsLongitudePlg', null));
          dispatch(setFormLupaAbsenPulang('jamPlg', ''));
          dispatch(setFormLupaAbsenPulang('keteranganLupaPulang', ''));
          dispatch(setFormLupaAbsenPulang('lokasiPlg', ''));
          dispatch(setFormLupaAbsenPulang('notePekerjaan', ''));
          // navigation.replace('dashboard');
        } catch (error) {
          console.log(error.response);
          const errorCode = error.response.status;
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

  const onChangeText = (value, inputType) => {
    dispatch(setFormLupaAbsenPulang(inputType, value));
  };
  const sendData = () => {
    if (
      form_lupa_absen_pulang.jamPlg === '' ||
      form_lupa_absen_pulang.keteranganLupaPulang === '' ||
      form_lupa_absen_pulang.notePekerjaan === ''
    ) {
      console.log('ada field yang kosong');
    } else {
      console.log('data yang di kirim : ', form_lupa_absen_pulang);
      kirimDataLupaAbsenPulang();
    }
  };
  const toDashboard = () => {
    // navigation.replace('dashboard');
    navigation.reset({
      index: 0,
      routes: [{name: 'dashboard'}],
    });
  };

  return (
    <View style={styles.FormBelumAbsenPulang}>
      {uploadBerhasil ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
          value={form_lupa_absen_pulang.keteranganLupaPulang}
          onTextChange={value => onChangeText(value, 'keteranganLupaPulang')}
        />
        <CustomTextInput
          label="Timesheet"
          secureTextEntry={false}
          value={form_lupa_absen_pulang.notePekerjaan}
          onTextChange={value => onChangeText(value, 'notePekerjaan')}
        />
        <CustomTextInput
          label="Jarak"
          secureTextEntry={false}
          editable={false}
          value={form_lupa_absen_pulang.jarakPlg}
        />
        <View style={styles.wrapperButton}>
          {lewatmaxJarak ? (
            <ButtonAction title="Jarak Terlalu Jauh" style={{width: 269}} />
          ) : isLoading ? (
            <ButtonLoading style={{width: 269}} />
          ) : (
            <ButtonAction
              title="kirim"
              style={{width: 269}}
              onPress={sendData}
            />
          )}
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
