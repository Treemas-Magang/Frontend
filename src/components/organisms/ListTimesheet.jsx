/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import CardTimesheet from '../molecules/CardTimesheet';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

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
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>
              Total Jam Reguler
            </Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>
              Total Lembur
            </Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: text.boldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text style={styles.textValue}>75 Jam</Text>
          </View>
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
    marginTop: -100,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: text.semiBold,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.black,
    width: 280,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
});
