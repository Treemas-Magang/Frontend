import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const DetailTimesheetUpdate = () => {
  return (
    <View
      style={{backgroundColor: Color.primary, flex: 1, position: 'relative'}}>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>DETAIL TIMESHEET</Text>
      <View style={styles.backgroundCardTimesheet}>
        <View>
          <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
            Hari
          </Text>
          <Text>08-11-2021</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailTimesheetUpdate;

const styles = StyleSheet.create({
  backgroundCardTimesheet: {
    backgroundColor: Color.background,
    paddingTop: 50,
    paddingHorizontal: 29,
    flex: 1,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -50,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Color.text,
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
