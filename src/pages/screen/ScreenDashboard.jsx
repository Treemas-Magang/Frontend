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

const ScreenDashboard = ({navigation}) => {
const [data, setData] = useState([])
  const dispatch = useDispatch();
  // const {data, error} = useSelector(state => state.userReducer);
  console.log(data)
  // console.log('redux',error)
  const baseUrl = 'http://10.0.2.2:3004';
  useEffect(() => {
    Axios.get(`${baseUrl}/user/`)
      .then(result => {
        const responseAPI = result;
        console.log('responseAPI')
        // dispatch(setDataUserAPI(responseAPI));
        setData(responseAPI)
      })
      .catch((error) => {
        console.log(error);
        // dispatch(fetchDataUserError('error'));
      });
  }, [setData]);
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
