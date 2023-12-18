/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Alert,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import getLocation from '../../utils/getLocation';
import {Color} from '../../utils/color';
import ButtonAction from '../atoms/ButtonAction';
import {getAlamat} from '../../utils/getAlamat';
// import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setAbsenPulang, setFormAbsensi} from '../../redux';
import {getTanggalSekarang} from '../../utils/getTanggalSekarang';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {hitungJarak} from '../../utils/hitungJarak';
import {checkMockLocation} from '../../utils/checkMockLocation';
import {getDataFromSession} from '../../utils/getDataSession';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialLokasiUser = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};
const initialLokasiPerusahaan = {
  // latitude: -6.245091550324631,
  // longitude: 106.6712797641271,
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

const MapPreviewTracking = ({navigation}) => {
  // const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
  // console.log('project id :', dataProject);
  // const dispatch = useDispatch();
  // const [currentLocation, setCurrentLocation] = useState(initialLokasiUser);
  // const [lokasiPerusahaan, setLokasiPerusahaan] = useState(
  //   initialLokasiPerusahaan,
  // );
  // const [locationLoaded, setLocationLoaded] = useState(false);


  // // useEffect(() => {
  // //   setLokasiPerusahaan({
  // //     ...lokasiPerusahaan,
  // //     latitude: dataProject.gpsLatProj,
  // //     longitude: dataProject.gpsLongProj,
  // //   });
  // // }, []);

  // useEffect(() => {
  //   const ambilLokasi = async () => {
  //     // const {date, time, dayName} = getTanggalSekarang();
  //     try {
  //       const locationData = await getLocation();
  //       console.log('Lokasi berhasil diambil:', locationData);
  //       getAlamat(
  //         locationData.latitude,
  //         locationData.longitude,
  //         'AIzaSyA1tH4Nq364y6knELo5DwSWIwyvxNRF2b8',
  //       )
  //         .then(data => {
  //           console.log('alamat : ', data);
  //           dispatch(setFormAbsensi('lokasiMsk', data));
  //           dispatch(setFormAbsensi('gpsLatitudeMsk', locationData.latitude));
  //           dispatch(setFormAbsensi('gpsLongitudeMsk', locationData.longitude));
  //           dispatch(setFormAbsensi('projectId', dataProject.projectId));
  //           //absenPulang
  //           dispatch(setAbsenPulang('lokasiPlg', data));
  //           dispatch(setAbsenPulang('gpsLatitudePlg', locationData.latitude));
  //           dispatch(setAbsenPulang('gpsLongitudePlg', locationData.longitude));
  //           dispatch(setAbsenPulang('projectId', dataProject.projectId));
  //         })
  //         .catch(error => console.log(error));
  //       setCurrentLocation({
  //         ...currentLocation,
  //         latitude: locationData.latitude,
  //         longitude: locationData.longitude,
  //       });
  //       setLocationLoaded(true);
  //     } catch (error) {
  //       console.error('Kesalahan saat mengambil lokasi:', error);
  //       setLocationLoaded(true); // Set to true even in case of an error to prevent infinite loading.
  //     }
  //   };

  //   ambilLokasi();
  // }, [setCurrentLocation]);


  // //////////////////////////////////////////////


  // //////////////////////////////////////////////

  return (
    <View style={{flex: 1, position: 'relative'}}>
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}>
        </MapView>
    </View>
  );
};

export default MapPreviewTracking;

const styles = StyleSheet.create({});
