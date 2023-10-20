/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getLocation from '../../utils/getLocation';
import { Color } from '../../utils/color';
import ButtonAction from '../atoms/ButtonAction';

const initialRegion = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

const MapPreview = () => {
  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    const ambilLokasi = async () => {
      try {
        const locationData = await getLocation();
        console.log('Lokasi berhasil diambil:', locationData);
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
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {locationLoaded ? (
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{ flex: 1 }}
          region={currentLocation}
        >
        <Marker coordinate={currentLocation} anchor={{ x: 0.5, y: 1.1 }}>
          <Image
            source={require('../../assets/vector/user.png')} 
            style={{ width: 40, height: 40, borderRadius: 50, borderWidth: 4, borderColor: Color.green }}
          />
        </Marker>
        </MapView>
      ) : (
        <ActivityIndicator size="large" />
      )}
      <ButtonAction style={{position: 'absolute', bottom: 50, left: '16%', width:269}} title='masuk'  />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({});
