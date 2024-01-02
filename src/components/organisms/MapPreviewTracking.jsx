/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';

const MapPreviewTracking = ({navigation}) => {
  const {mapTraking} = useRoute().params;
  const [markers, setMarkers] = useState(mapTraking);
  const [markersTanpaNull, setMarkersTanpaNull] = useState([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);

  useEffect(() => {
    // Filter markers array to remove objects with null latitude or longitude
    const filteredMarkers = markers.filter(
      marker => marker.latitude !== null && marker.longitude !== null,
    );

    // Update the state with the filtered array
    setMarkersTanpaNull(filteredMarkers);
  }, [markers]); // useEffect will run whenever markers change

  console.log('tanpa null', markersTanpaNull);

  const polylineCoordinates = markersTanpaNull?.map((marker, index) => ({
    latitude: marker.latitude,
    longitude: marker.longitude,
    key: index.toString(), // Use the index as the key
  }));

  const averageLatitude =
    polylineCoordinates.reduce((sum, coord) => sum + coord.latitude, 0) /
    polylineCoordinates.length;

  const averageLongitude =
    polylineCoordinates.reduce((sum, coord) => sum + coord.longitude, 0) /
    polylineCoordinates.length;

  const initialLokasiUser = {
    latitude: isFinite(averageLatitude) ? averageLatitude : 0,
    longitude: isFinite(averageLongitude) ? averageLongitude : 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const handleMoveToMarker = index => {
    if (index >= 0 && index < markersTanpaNull.length) {
      setCurrentMarkerIndex(index);
      const marker = markersTanpaNull[index];
      mapViewRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  const initialCameraPosition = {
    latitude: markersTanpaNull.length > 0 ? markersTanpaNull[0].latitude : 0,
    longitude: markersTanpaNull.length > 0 ? markersTanpaNull[0].longitude : 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const markerImage = require('../../assets/vector/user.png');

  const mapViewRef = React.createRef();

  return (
    <View style={{flex: 1}}>
      <ButtonBack styleColor={Color.green} navigation={navigation} />
      <MapView
        ref={mapViewRef}
        style={{flex: 1}}
        region={initialLokasiUser}
        showsUserLocation
        followsUserLocation>
        {polylineCoordinates && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeWidth={4}
            strokeColor={Color.green}
          />
        )}

        {markersTanpaNull.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={markerImage}
          />
        ))}
      </MapView>

      <View style={styles.buttonContainerLeft}>
        <TouchableOpacity
          onPress={() => handleMoveToMarker(currentMarkerIndex - 1)}>
          <Text style={styles.button}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.markerTitle}>
          {markersTanpaNull[currentMarkerIndex]?.title}
        </Text>
      </View>

      <View style={styles.buttonContainerRight}>
        <TouchableOpacity
          onPress={() => handleMoveToMarker(currentMarkerIndex + 1)}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.markerTitle}>
          {markersTanpaNull[currentMarkerIndex]?.title}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  buttonContainerLeft: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  buttonContainerRight: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  button: {
    backgroundColor: Color.green,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  markerTitle: {
    textAlign: 'center',
    color: 'black', // Ganti warna sesuai kebutuhan
    marginTop: 8,
  },
};

export default MapPreviewTracking;
