/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormAbsensi from '../../components/organisms/FormAbsensi';
import {Color} from '../../utils/color';

const ScreenFormAbsensi = () => {
  return (
    <View style={styles.wrapperForm}>
      <ScrollView>
        <FormAbsensi />
      </ScrollView>
    </View>
  );
};

export default ScreenFormAbsensi;

const styles = StyleSheet.create({
  wrapperForm: {
    flex: 1,
    backgroundColor: Color.green,
    alignItems: 'center',
    paddingTop: 30,
  },
});
