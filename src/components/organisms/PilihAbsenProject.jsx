/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../utils/color';
import CardPilihAbsenProject from '../molecules/CardPilihAbsenProject';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
const PilihAbsenProject = ({navigation}) => {
    const [projectData, setProjectData] = useState(null);
    const getDataFromStorage = async key => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          console.log(`Retrieved data for key ${key}:`, parsedData);
          setProjectData(parsedData); // Set the retrieved data to the state
        } else {
          console.log(`No data found for key ${key}`);
        }
      } catch (error) {
        console.error(`Error retrieving data for key ${key}:`, error);
      }
    };

    // useEffect to retrieve data on component mount
    useEffect(() => {
      getDataFromStorage('projectData');
    }, []);
    console.log('dari storage', projectData)
  return (
    <View style={styles.CardUpdateTimesheet}>
      <Text
        style={{
          fontFamily: text.semiBold,
          textTransform: 'uppercase',
          fontSize: 17,
          color: Color.blue,
        }}>
        MEMILIH LOKASI ABSENSI PROJECT
      </Text>
      <CardPilihAbsenProject
        navigation={navigation}
      />
    </View>
  );
};

export default PilihAbsenProject;
const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    width: wp('85%'),
    height: hp('55%'),
    backgroundColor: Color.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
