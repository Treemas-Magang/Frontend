/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {Color} from '../../utils/color';
import requestLocationPermission from '../../utils/permissionService';
import getAppVersion from '../../utils/getAppVersion';
import getIdDevice from '../../utils/getIdDevice';
import { resetSudahAbsen } from '../../utils/resetSudahAbsen';
import { getDataFromSession } from '../../utils/getDataSession';
import { jamSekarang } from '../../utils/jamSekarang';
import { countDataWithFalseStatus, getToken } from '../../utils/buatStatusPengumumanFalse';
import { setJumlahApproval, setJumlahPengumuman } from '../../redux';
import { useDispatch } from 'react-redux';
const ScreenSplash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(jamSekarang());
    resetSudahAbsen();
    const fetchData = async () => {
      try {
        // Dapatkan ID perangkat
        const deviceId = await getIdDevice();

        // Dapatkan versi aplikasi
        const appVersion = await getAppVersion();

        // Mintakan izin lokasi
        await requestLocationPermission();

        // Navigasi ke layar login setelah berhasil mendapatkan semua informasi
        if (deviceId && appVersion) {
          navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
          });
        }
      } catch (error) {
        // Tangani kesalahan jika diperlukan
        console.error('Error:', error);
      }
    };
    getDataFromSession('token')
      .then(token => {
        if (token !== null) {
          navigation.reset({
            index: 0,
            routes: [{name: 'dashboard'}],
          });
        } else {
          fetchData();
        }
      })
      .catch(error => console.log(error));
    // const token =
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDAzIiwiaWF0IjoxNzAwNzk0OTIyLCJleHAiOjE3MDA4ODEzMjJ9.MLVAc0CtlKJN__I4IozWiI_TloIIgtbjKXZ1QYfbuco';
    //   if (token !== null) {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{name: 'dashboard'}],
    //     });
    //   } else {
    //     fetchData();
    //   }
  }, [navigation]);
  // Fetch notifications
useEffect(() => {
  // render notif //
  getToken().then(() => {
    countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
      console.log(
        'Jumlah ID dengan status false:',
        jumlahDataDenganStatusFalse,
      );
      // setJmlBlmBaca(+jumlahDataDenganStatusFalse)
      dispatch(setJumlahPengumuman('pengumuman', +jumlahDataDenganStatusFalse));
      // setJmlPengumuman(+jumlahDataDenganStatusFalse);

      ////////////////////////////////////////////
      // ini untuk jumlah Approval
      // setJumlahApproval(10);
    });
  });

  /////////////////
}, [dispatch]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.white,
      }}>
      <View style={[styles.container]}>
        <Image source={require('../../assets/icons/logo.png')} />
      </View>
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={Color.green} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ScreenSplash;
