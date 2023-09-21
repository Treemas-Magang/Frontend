import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const DataPribadi = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 310,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Text style={styles.textNama}>Rizki febriansyah</Text>
        <Text style={styles.textNik}>832372823</Text>
      </View>
      <View
        style={{
          width: 83,
          height: 83,
          backgroundColor: Color.blue,
          borderRadius: 100,
        }}></View>
    </View>
  );
};

export default DataPribadi;

const styles = StyleSheet.create({
  textNama: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  textNik: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Color.blue,
  },
});
