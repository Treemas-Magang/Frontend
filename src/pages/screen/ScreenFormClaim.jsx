/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import FormClaim from '../../components/organisms/FormClaim';

const ScreenFormClaim = () => {
  return (
    <View style={styles.wrapperForm}>
      <ScrollView>
        <FormClaim />
      </ScrollView>
    </View>
  );
};

export default ScreenFormClaim;

const styles = StyleSheet.create({
  wrapperForm: {
    flex: 1,
    backgroundColor: Color.green,
    alignItems: 'center',
    paddingTop: 30,
  },
});
