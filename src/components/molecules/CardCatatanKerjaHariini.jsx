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
import {AlertNotificationSuccess} from '../atoms/AlertNotification';

const CardCatatanKerjaHariini = ({navigation}) => {
  // const {jamKeluar} = useRoute().params;
  // console.log('jam keluar : ', jamKeluar)
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
  const [pulangCepat, setPulangCepat] = useState(false);
  const dispatch = useDispatch();
  const {formPulang} = useSelector(state => state.AbsenPulangReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setAbsenPulang(inputType, value));
  };

  useEffect(() => {
    const cekPlgCpt = cekPulangCepat(dataProject.jamKeluar);
    console.log('cek telat', cekPlgCpt);
    setPulangCepat(cekPlgCpt);
  }, [dataProject]);

  const uploadData = async data => {
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.post(
          'http://192.168.10.31:8081/api/absen/input-absen-pulang',
          data,
          {headers},
        );
        console.log(response.data.success);
        console.log('berhasil absen pulang');
        console.log(uploadBerhasil);
        setUploadBerhasil(true);
        setIsLoading(false);
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
    }
  };

  const close = () => {
    setUploadBerhasil(false);
  };

  const sendData = async () => {
    checkMockLocation();
    console.log('kirim data : ', formPulang);
    await uploadData(formPulang);
  };

  return (
    <View style={styles.container}>
      {uploadBerhasil ? (
        <View style={{position: 'absolute'}}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Project Berhasil Di Update"
            titleAlert="Success"
            onPress={close}
          />
        </View>
      ) : (
        ''
      )}
      <View style={styles.CardCatatanKerja}>
        <Text
          style={{
            fontFamily: text.semiBold,
            color: Color.blue,
            fontSize: 24,
            textTransform: 'uppercase',
          }}>
          Catatan Kerja Hari Ini
        </Text>
        <CustomTextInput
          label="Timesheet"
          value={formPulang.notePekerjaan}
          onTextChange={value => onChangeText(value, 'notePekerjaan')}
          secureTextEntry={false}
        />
        {pulangCepat ? (
          <CustomTextInput
            label="Catan Pulang Cepat"
            value={formPulang.notePlgCepat}
            onTextChange={value => onChangeText(value, 'notePlgCepat')}
            secureTextEntry={false}
          />
        ) : (
          ''
        )}

        <ButtonAction onPress={() => sendData()} title="KIRIM" />
      </View>
    </View>
  );
};

export default CardCatatanKerjaHariini;

const styles = StyleSheet.create({
  CardCatatanKerja: {
    backgroundColor: Color.white,
    width: 320,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 20,
  },
});
