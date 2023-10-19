/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapPreview = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={{flex: 1}}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
       }}
     >
     </MapView>
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({})