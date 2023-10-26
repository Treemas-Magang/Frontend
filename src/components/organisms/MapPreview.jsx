/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import getLocation from '../../utils/getLocation';
import {Color} from '../../utils/color';
import ButtonAction from '../atoms/ButtonAction';
import {getAlamat} from '../../utils/getAlamat';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setAbsenMasuk} from '../../redux';
import {getTanggalSekarang} from '../../utils/getTanggalSekarang';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const initialRegion = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

const MapPreview = ({navigation}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.AbsenMasukReducer);
  const [isAbsen, setIsAbsen] = useState(false);
  const [isPerbarui, setIsPerbarui] = useState(false);
  const [isPulang, setIsPulang] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const [locationLoaded, setLocationLoaded] = useState(false);

  const project_id = 'TMS';
  const nik = '222222';
  const nama = 'Rizki febriansyah';
  let is_absen = 1;
  let is_wfh = 0;
  useEffect(() => {
    const ambilLokasi = async () => {
      const {date, time, dayName} = getTanggalSekarang();
      try {
        const locationData = await getLocation();
        console.log('Lokasi berhasil diambil:', locationData);
        setCurrentLocation({
          ...currentLocation,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
        dispatch(setAbsenMasuk('project_id', project_id));
        dispatch(setAbsenMasuk('nik', nik));
        dispatch(setAbsenMasuk('nama', nama));
        dispatch(setAbsenMasuk('gps_latitude_msk', locationData.latitude));
        dispatch(setAbsenMasuk('gps_longitude_msk', locationData.longitude));
        dispatch(setAbsenMasuk('hari', dayName));
        dispatch(setAbsenMasuk('tgl_absen', date));
        dispatch(setAbsenMasuk('jam_msk', time));
        dispatch(setAbsenMasuk('is_absen', is_absen));
        dispatch(setAbsenMasuk('is_wfh', is_wfh));
        // getAlamat(locationData.latitude, locationData.longitude)
        // .then((address) => {
        //   console.log('Alamat:', address);
        // })
        // .catch((error) => {
        //   console.error('Error:', error);
        // });
        // axios
        //   .get('https://maps.googleapis.com/maps/api/geocode/json', {
        //     params: {
        //       latlng: `${locationData.latitude},${locationData.longitude}`,
        //       key: 'AIzaSyByMFGn8i353SjJL_H0_hEfTmpUPx3_lC8', // Ganti dengan kunci API Google Maps Anda
        //     },
        //   })
        //   .then(response => {
        //     const data = response.data;
        //     // if (data.results.length > 0) {
        //     //   const address = data.results[0].formatted_address;
        //     //   console.log('Alamat:', address);
        //     // } else {
        //     //   console.warn('Alamat tidak ditemukan.');
        //     // }
        //     console.log(data);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
        setLocationLoaded(true);
      } catch (error) {
        console.error('Kesalahan saat mengambil lokasi:', error);
        setLocationLoaded(true); // Set to true even in case of an error to prevent infinite loading.
      }
    };

    ambilLokasi();
  }, [setCurrentLocation]);
  const handleMasuk = () => {
    setIsAbsen(true);
    console.log('data absen masuk : ', form);
  };
  const handlePerbarui = () => {
    setIsPerbarui(true);
  };
  const handlePulang = () => {
    setIsPulang(true);
  };
  return (
    <View style={{flex: 1, position: 'relative'}}>
      {locationLoaded ? (
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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
        </MapView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {locationLoaded ? (
        <>
          {isAbsen ? (
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
              />
              <ButtonAction
                style={{
                  width: wp('75%'),
                  backgroundColor: Color.cardPulangCepat,
                }}
                title="pulang"
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
