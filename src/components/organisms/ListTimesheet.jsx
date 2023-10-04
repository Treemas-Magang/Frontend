import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import CardTimesheet from '../molecules/CardTimesheet';
import {Color} from '../../utils/color';

const ListTimesheet = ({navigation}) => {
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>TIMESHEET</Text>
      <View style={styles.backgroundCardTimesheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardTimesheet navigation={navigation} />
          <CardTimesheet navigation={navigation} />
          <CardTimesheet navigation={navigation} />
          <CardTimesheet navigation={navigation} />
          <CardTimesheet navigation={navigation} />
          <CardTimesheet navigation={navigation} />
        </ScrollView>
        <View style={styles.catatanKerja}>
          <Text style={{fontFamily: 'Poppins-LightItalic'}}>
            Total Jam Reguler
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListTimesheet;

const styles = StyleSheet.create({
  backgroundCardTimesheet: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -50,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Color.blue,
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  catatanKerja: {
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.black,
    padding: 50,
    margin: 8,
  },
});
