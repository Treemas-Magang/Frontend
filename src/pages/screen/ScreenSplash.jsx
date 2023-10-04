/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color} from '../../utils/color';
import getLocation from '../../utils/getLocation';
import requestLocationPermission from '../../utils/permissionService';
import {useDispatch, useSelector} from 'react-redux';
import {setLocation} from '../../redux';
import Geolocation from '@react-native-community/geolocation';
import getAppVersion from '../../utils/getAppVersion';
const ScreenSplash = ({navigation}) => {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.SplashReducer);

  useEffect(() => {
    // Geolocation.setRNConfiguration({
    //   skipPermissionRequests: true, // Anda perlu mengurus izin sendiri
    //   authorizationLevel: 'whenInUse', // Izin yang diperlukan saat aplikasi aktif
    // });
    getAppVersion()
    const fetchData = async () => {
      // ...

      // Meminta izin lokasi dan mendapatkan lokasi
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        console.log('Izin lokasi diberikan.');
        try {
          const locationData = await getLocation();
          console.log('Lokasi berhasil diambil:', locationData);

          // Set nilai lokasi ke dalam reducer
          dispatch(
            setLocation(
              locationData.latitude,
              locationData.longitude,
              locationData.accuracy,
            ),
          );
        } catch (error) {
          console.error('Kesalahan saat mengambil lokasi:', error);
        }
      } else {
        console.log('Izin lokasi tidak diberikan.');
      }

      // ...

      // Cek apakah data isAppVersion telah disimpan di AsyncStorage
      AsyncStorage.getItem('appVersion')
        .then(savedAppVersion => {
          console.log('versi app : ',savedAppVersion)
          const shouldNavigate = savedAppVersion !== null;
          if (shouldNavigate && location !== null) {
            // Jika data tersedia di AsyncStorage dan location tidak null, lanjutkan ke halaman login
            navigation.reset({
              index: 0,
              routes: [{name: 'login'}],
            });
          }
        })
        .catch(error => {
          console.error(
            'Gagal mengambil data versi aplikasi atau location',
            error,
          );
        });
    };

    fetchData();
  }, [navigation, dispatch]);
  console.log('dari redux: ',location)
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
