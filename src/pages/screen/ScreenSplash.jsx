import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color} from '../../utils/color';
import getLocation from '../../utils/getLocation';
import requestLocationPermission from '../../utils/permissionService';

const ScreenSplash = ({navigation}) => {
  const [isIdDevice, setIsIdDevice] = useState('');
  const [isAppVersion, setIsAppVersion] = useState('');
  const [location, setLocation] = useState(null); // Inisialisasi state location dengan null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // ...

      // Meminta izin lokasi dan mendapatkan lokasi
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        console.log('Izin lokasi diberikan.');
        try {
          const locationData = await getLocation();
          console.log('Lokasi berhasil diambil:', locationData);

          // Set nilai lokasi ke dalam state
          setLocation(locationData);
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
          const shouldNavigate = savedAppVersion !== null;
          if (shouldNavigate && location !== null) {
            // Jika data tersedia di AsyncStorage dan location tidak null, lanjutkan ke halaman login
            navigation.reset({
              index: 0,
              routes: [{name: 'login'}],
            });
            const latitude = location.latitude;
            const longitude = location.longitude;
            const accuracy = location.accuracy;
            console.log('ini location dari state latitude', latitude);
            console.log('ini location dari state longitude', longitude);
            console.log('ini location dari state accuracy', accuracy);
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
  }, [navigation, setLocation, location]);

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