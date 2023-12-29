/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {useSelector, useDispatch} from 'react-redux';
import {setAbsenPulang} from '../../redux';
import {cekPulangCepat} from '../../utils/cekJamTelatDanPulangCepat';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import {checkMockLocation} from '../../utils/checkMockLocation';
import {
  AlertNotificationDanger,
  AlertNotificationSuccess,
} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';
import {API_URL, API_GABUNGAN} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FormCatatanKerjaHariini = ({navigation}) => {
  // const {jamKeluar} = useRoute().params;
  // console.log('jam keluar : ', jamKeluar)
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [pulangCepat, setPulangCepat] = useState(false);
  const dispatch = useDispatch();
  const {formPulang} = useSelector(state => state.AbsenPulangReducer);
  const [projectData, setProjectData] = useState(null);
  const [inputKosong, setInputKosong] = useState(false);
  const getDataFromStorage = async key => {
    try {
      const storedData = await AsyncStorage.getItem(key);
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        console.log(`Retrieved data for key ${key}:`, parsedData);
        setProjectData(parsedData); // Set the retrieved data to the state
      } else {
        console.log(`No data found for key ${key}`);
      }
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
    }
  };

  // useEffect to retrieve data on component mount
  useEffect(() => {
    getDataFromStorage('projectData');
  }, []);
  console.log('dari storage', projectData);

  const onChangeText = (value, inputType) => {
    dispatch(setAbsenPulang(inputType, value));
  };

  useEffect(() => {
    if (projectData !== null) {
      const cekPlgCpt = cekPulangCepat(projectData.jamKeluar);
      // console.log(dataProject);
      console.log('cek telat', cekPlgCpt);
      setPulangCepat(cekPlgCpt);
    }
  }, [projectData]);

  const uploadData = async data => {
    setBtnLoading(true);
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.post(
          API_GABUNGAN + '/api/absen/input-absen-pulang',
          data,
          {headers},
        );
        console.log(response.data.success);
        console.log('berhasil absen pulang');
        console.log(uploadBerhasil);
        setUploadBerhasil(true);
        setIsLoading(false);
        setBtnLoading(false);
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
            setBtnLoading(false);
            setServerError(true);
            console.log('Kesalahan server');
            break;
          default:
            setIsLoading(false);
            console.log('gagal absen');
            break;
        }
      }
    }
  };

  const toDashboard = () => {
    // navigation.replace('dashboard');
    navigation.reset({
      index: 0,
      routes: [{name: 'dashboard'}],
    });
  };

  const sendData = async () => {
    checkMockLocation();
    console.log('kirim data : ', formPulang);
    if (pulangCepat) {
      console.log('alasan telat masuk tidak boleh kosong');
      setIsLoading(false);
      if (formPulang.notePlgCepat !== '' && formPulang.notePekerjaan !== '') {
        await uploadData(formPulang);
      } else {
        console.log('tidak ada yang boleh form yang kosong');
      }
    }
    if (pulangCepat !== true) {
      if (formPulang.notePekerjaan !== '') {
        setInputKosong(false);
        await uploadData(formPulang);
      }
    }
  };

  return (
    <View style={styles.CardCatatanKerja}>
      {uploadBerhasil ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Berhasil Melakukan Absen Pulang"
            titleAlert="Success"
            onPress={toDashboard}
          />
        </View>
      ) : (
        ''
      )}
      {serverError ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationDanger
            buttonAlert="Close"
            textBodyAlert="Server Sedang Error"
            titleAlert="Error"
            onPress={toDashboard}
          />
        </View>
      ) : (
        ''
      )}
      <Text style={styles.Judul}>Catatan Kerja Hari Ini</Text>
      <CustomTextInput
        label="Timesheet"
        textColor={inputKosong ? Color.red : Color.blue}
        value={formPulang.notePekerjaan}
        onTextChange={value => onChangeText(value, 'notePekerjaan')}
        style={inputKosong ? styles.fieldSalah : styles.fieldBener}
        secureTextEntry={false}
      />
      {pulangCepat ? (
        <CustomTextInput
          label="Catan Pulang Cepat"
          textColor={inputKosong ? Color.red : Color.blue}
          value={formPulang.notePlgCepat}
          onTextChange={value => onChangeText(value, 'notePlgCepat')}
          style={inputKosong ? styles.fieldSalah : styles.fieldBener}
          secureTextEntry={false}
        />
      ) : (
        ''
      )}
      {inputKosong ? (
        <Text style={styles.labelSalah}>Field Tidak Boleh Kosong!</Text>
      ) : (
        ''
      )}

      {btnLoading ? (
        <ButtonLoading />
      ) : (
        <ButtonAction onPress={() => sendData()} title="KIRIM" />
      )}
    </View>
  );
};

export default FormCatatanKerjaHariini;

const styles = StyleSheet.create({
  CardCatatanKerja: {
    backgroundColor: Color.white,
    width: 320,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    paddingVertical: 30,
    marginTop: 30,
  },
  Judul: {
    fontFamily: text.semiBold,
    color: Color.blue,
    fontSize: 24,
    textTransform: 'uppercase',
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
  labelSalah: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
});
