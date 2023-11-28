/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, ActivityIndicator, Image, Alert} from 'react-native';
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
import { checkMockLocation } from '../../utils/checkMockLocation';
import { getDataFromSession } from '../../utils/getDataSession';
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

const MapPreview = ({navigation}) => {
  const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
  console.log('project id :', dataProject);
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.AbsenMasukReducer);
  const {isWFH} = useSelector(state => state.IsWFHReducer);
  console.log('isWFH :', isWFH)
  const [isAbsen, setIsAbsen] = useState('');
  const [isPerbarui, setIsPerbarui] = useState(false);
  const [isPulang, setIsPulang] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(initialLokasiUser);
  const [lokasiPerusahaan, setLokasiPerusahaan] = useState(initialLokasiPerusahaan);
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    setLokasiPerusahaan({
      ...lokasiPerusahaan,
      latitude: dataProject.gpsLatProj,
      longitude: dataProject.gpsLongProj,
    });
  }, []);

  useEffect(() => {
    getDataFromSession('sudah_absen')
      .then(data => {
        setIsAbsen(data);
      })
      .catch(error => console.log('gagal ambil data dari session'));
  }, []);

  console.log('sudah absen ? ', isAbsen);

  useEffect(() => {
    const ambilLokasi = async () => {
      const {date, time, dayName} = getTanggalSekarang();
      try {
        const locationData = await getLocation();
        console.log('Lokasi berhasil diambil:', locationData);
        getAlamat(
          locationData.latitude,
          locationData.longitude,
          'AIzaSyA1tH4Nq364y6knELo5DwSWIwyvxNRF2b8',
        )
          .then(data => {
            console.log('alamat : ', data);
            dispatch(setFormAbsensi('lokasiMsk', data));
            dispatch(setFormAbsensi('gpsLatitudeMsk', locationData.latitude));
            dispatch(setFormAbsensi('gpsLongitudeMsk', locationData.longitude));
            dispatch(setFormAbsensi('projectId', dataProject.projectId));
            //absenPulang
            dispatch(setAbsenPulang('lokasiPlg', data));
            dispatch(setAbsenPulang('gpsLatitudePlg', locationData.latitude));
            dispatch(setAbsenPulang('gpsLongitudePlg', locationData.longitude));
            dispatch(setAbsenPulang('projectId', dataProject.projectId));
          })
          .catch(error => console.log(error));
        setCurrentLocation({
          ...currentLocation,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
        setLocationLoaded(true);
      } catch (error) {
        console.error('Kesalahan saat mengambil lokasi:', error);
        setLocationLoaded(true); // Set to true even in case of an error to prevent infinite loading.
      }
    };

    ambilLokasi();
  }, [setCurrentLocation]);
  useEffect(() => {
    if (
      lokasiPerusahaan.latitude &&
      lokasiPerusahaan.longitude &&
      currentLocation.latitude &&
      currentLocation.longitude
    ) {
      const distance = hitungJarak(
        lokasiPerusahaan.latitude,
        lokasiPerusahaan.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
      );
      const jarakMeter = distance;
      const jarakBulat = Math.ceil(jarakMeter);
      console.log(`Jarak antara kedua titik adalah ${jarakMeter} meter.`);
      console.log(`Jarak antara kedua titik adalah ${jarakBulat} meter.`);
      dispatch(setFormAbsensi('jarakMsk', `${jarakBulat} meter`));
      dispatch(setAbsenPulang('jarakPlg', `${jarakBulat} meter`));
      //jarak user ke kantor 100 = 100 meter
      const jarakMaxMasuk = parseInt(dataProject.jrkMax);
      console.log('jarak max masuk : ', jarakMaxMasuk);
      if (isWFH === '0' || isAbsen === 'true') {
        if (jarakBulat > jarakMaxMasuk) {
          Alert.alert(
            'Peringatan',
            'Jarak Anda ke tempat kerja lebih dari 100 meter. Anda tidak dapat melakukan absen.',
            [
              {
                text: 'Kembali',
                onPress: () => {
                  navigation.navigate('dashboard');
                },
              },
            ],
          );
        }
      }
    } else {
      console.log('Salah satu lokasi tidak valid, jarak tidak dapat dihitung.');
    }
  }, [lokasiPerusahaan, currentLocation]);
  const handleMasuk = () => {
    checkMockLocation();
    navigation.navigate('formAbsensi');
    console.log('data absen masuk : ', form);
  };

  //////////////////////////////////////////////
  const perbaruiAbsen = async () => {
    try {
      await AsyncStorage.setItem('perbarui_absen', 'true');
      console.log('berhasil menyimpan status sudah absen');
    } catch (error) {
      console.log('gagal menyimpan status sudah absen', error);
    }
  };

  //////////////////////////////////////////////

  const handlePerbarui = async () => {
    // await sudahAbsen();
    // setIsPerbarui(true);
    await perbaruiAbsen();
    navigation.navigate('pilihProject');
  };
  const handlePulang = () => {
    // setIsPulang(true);
    navigation.navigate('formAbsenPulang');
  };
  return (
    <View style={{flex: 1, position: 'relative'}}>
      {locationLoaded ? (
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={currentLocation}>
          <Marker coordinate={currentLocation} anchor={{x: 0.5, y: 1.1}}>
            <Image
              source={require('../../assets/vector/user.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                borderWidth: 4,
                borderColor: Color.green,
              }}
            />
          </Marker>

          {lokasiPerusahaan.latitude !== null &&
            lokasiPerusahaan.longitude !== null && (
              <Marker coordinate={lokasiPerusahaan}>
                <Image
                  source={require('../../assets/vector/user.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    borderWidth: 4,
                    borderColor: Color.green,
                  }}
                />
              </Marker>
            )}
        </MapView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {locationLoaded ? (
        <>
          {isAbsen === 'true' ? (
            <View
              style={{
                position: 'absolute',
                bottom: 50,
                left: wp('12'),
                width: wp('75%'),
                gap: 10,
              }}>
              <ButtonAction
                style={{
                  width: wp('75%'),
                }}
                title="perbarui"
                onPress={handlePerbarui}
              />
              <ButtonAction
                style={{
                  width: wp('75%'),
                  backgroundColor: Color.cardPulangCepat,
                }}
                title="pulang"
                onPress={handlePulang}
              />
            </View>
          ) : (
            <ButtonAction
              onPress={handleMasuk}
              style={{
                position: 'absolute',
                bottom: 50,
                left: wp('12'),
                width: wp('75%'),
              }}
              title="masuk"
            />
          )}
        </>
      ) : (
        ''
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({});
