/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {useSelector, useDispatch} from 'react-redux';
import {setFormTimesheet} from '../../redux';
import {useRoute} from '@react-navigation/native';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import axios from 'axios';
import {AlertNotificationSuccess} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';

const CardUpdateTimesheet = ({navigation}) => {
  const {tgl, id} = useRoute().params;
  console.log('id :', id);
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.TimesheetReducer);
  const [inputKosong, setInputKosong] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const onChangeText = (value, inputType) => {
    dispatch(setFormTimesheet(inputType, value));
  };
  const kirimDataUpdateTimesheet = async () => {
    try {
      //mengambil token untuk otorisasi
      const token = await getDataFromSession('token');
      if (token !== null) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          //melakukan hit ke API untuk kirim data Absen
          const response = await axios.put(
            API_GABUNGAN + '/api/rekap/update-timesheet?id=' + id,
            form,
            {headers},
          );
          console.log(response);
          console.log('berhasil mengirim form update timeSheet');
          console.log(uploadBerhasil);
          setUploadBerhasil(true);
          setBtnLoading(false);
          //saat berhasil kirim data kosongkan reducer
          dispatch(setFormTimesheet('keteranganTimesheet', ''));
        } catch (error) {
          console.log(error.response);
          const errorCode = error.response.status;
          switch (errorCode) {
            case 403:
              console.log('project tidak tepat');
              setBtnLoading(false);
              break;
            case 404:
              setBtnLoading(false);
              break;
            case 500:
              setBtnLoading(false);
              console.log('Kesalahan server');
              break;
            default:
              setBtnLoading(false);
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

  const sendData = () => {
    if (form.note !== '') {
      setInputKosong(false);
      kirimDataUpdateTimesheet();
      setBtnLoading(true);
      console.log('kirim data : ', form);
    } else {
      setInputKosong(true);
      setBtnLoading(false);
      // console.warn('tidak ada yang boleh form yang kosong');
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
    <View style={styles.container}>
      {uploadBerhasil ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Berhasil Update Timesheet"
            titleAlert="Success"
            onPress={toDashboard}
          />
        </View>
      ) : (
        ''
      )}
      <View style={styles.CardUpdateTimesheet}>
        <Text
          style={{
            fontFamily: text.semiBold,
            color: Color.blue,
            fontSize: 24,
          }}>
          {tgl}
        </Text>
        <CustomTextInput
          label="Keterangan"
          value={form.noteTimesheet}
          textColor={inputKosong ? Color.red : Color.blue}
          style={inputKosong ? styles.fieldSalah : styles.fieldBener}
          onTextChange={value => onChangeText(value, 'noteTimesheet')}
          secureTextEntry={false}
          maxLength={25}
        />
        {inputKosong ? (
          <View>
            <Text style={styles.labelSalah}>Field Tidak Boleh Kosong!</Text>
          </View>
        ) : (
          ''
        )}
        {btnLoading ? (
          <ButtonLoading />
        ) : (
          <ButtonAction onPress={() => sendData()} title="UPDATE" />
        )}
      </View>
    </View>
  );
};

export default CardUpdateTimesheet;

const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    backgroundColor: Color.white,
    width: 320,
    height: 320,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fieldSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
  },
  fieldBener: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
  },
  labelSalah: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
});
