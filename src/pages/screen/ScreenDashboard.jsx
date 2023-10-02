/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Color} from '../../utils/color';
import Axios from 'axios';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import MenuUtama from '../../components/organisms/MenuUtama';
import DataPribadi from '../../components/molecules/DataPribadi';
import {setDataUserAPI, fetchDataUserError} from '../../redux';

const dataUser = [{
    nik: 12981291829,
    nama_karyawan: 'rizki aja rizki ajarizki aja rizki aja aja ajaaja dfsdf sdfsf dsfsfs dsf dsf',
}]
const ScreenDashboard = ({navigation}) => {
const [isNik, setIsNik] = useState('')
const [isNama_karyawan, setIsNamaKaryawan] = useState('')
 const dispatch = useDispatch();
const {data} = useSelector((state) => state.userReducer);
  useEffect(() => {
    // Dispatch the action to set dataUser in Redux store
    dispatch(setDataUserAPI(dataUser));
  }, []);

  useEffect(() => {
  // Pastikan data sudah tersedia sebelum mengaksesnya
  if (data && data.length > 0) {
    const { nik, nama_karyawan } = data[0];
    setIsNik(nik)
    setIsNamaKaryawan(nama_karyawan)
  }
}, [data]);
  return (
    <View style={{alignItems: 'center', backgroundColor: Color.green}}>
      <ButtonLogout navigation={navigation} />
      <View
        style={{
          position: 'absolute',
          top: 80,
          width: 310,
        }}>
        <DataPribadi nama_karyawan={isNama_karyawan} nik={isNik} />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.judulSection}>Statistik Tahun ini</Text>
        <StatistikTahunIni />
      </View>
      <View style={styles.containerMenu}>
        <Text style={styles.judulSection}>menu utama</Text>
        <MenuUtama navigation={navigation} />
      </View>
    </View>
  );
};
export default ScreenDashboard;

const styles = StyleSheet.create({
  containerInfo: {
    backgroundColor: Color.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    position: 'relative',
    marginTop: -30,
  },
  containerMenu: {
    backgroundColor: Color.green,
    width: '100%',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
    marginTop: -50,
    height: '100%',
    position: 'relative',
  },

  judulSection: {
    position: 'absolute',
    top: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: Color.blue,
    textTransform: 'uppercase',
  },
});
