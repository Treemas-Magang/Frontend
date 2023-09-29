/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Color} from '../../utils/color';
import Axios from 'axios';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import MenuUtama from '../../components/organisms/MenuUtama';
import DataPribadi from '../../components/molecules/DataPribadi';
import {setDataUserAPI, fetchDataUserError} from '../../redux';

const ScreenDashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, error} = useSelector(state => state.userReducer);
  const baseUrl = 'http://192.168.93:3004';
  useEffect(() => {
    // Axios.get(`${baseUrl}/user`)
    //   .then((result) => {
    //     const responseAPI = result.data;
    //     dispatch(setDataUserAPI(responseAPI));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     dispatch(fetchDataUserError(error.message));
    //   });
    fetch(`${baseUrl}/user`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Mengembalikan promise dengan data JSON
  })
  .then((data) => {
    // Handle response data here
    console.log(data);
  })
  .catch((error) => {
    // Handle error here
    console.error('Error:', error);
  });

  }, [baseUrl]);
  console.log(data);
  console.log(error);
  return (
    <View style={{alignItems: 'center', backgroundColor: Color.green}}>
      <ButtonLogout navigation={navigation} />
      <View
        style={{
          position: 'absolute',
          top: 80,
          width: 310,
        }}>
        <DataPribadi />
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
