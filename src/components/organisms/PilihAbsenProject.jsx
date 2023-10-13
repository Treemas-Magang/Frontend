import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import CardPilihAbsenProject from '../molecules/CardPilihAbsenProject';

const PilihAbsenProject = ({navigation}) => {
  return (
    <View>
      <View style={styles.CardUpdateTimesheet}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            textTransform: 'uppercase',
            fontSize: 17,
            color: Color.blue,
          }}>
          MEMILIH LOKASI ABSENSI PROJECT
        </Text>
        <CardPilihAbsenProject navigation={navigation} />
      </View>
    </View>
  );
};

export default PilihAbsenProject;

const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    width: 340,
    height: 380,
    backgroundColor: Color.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
