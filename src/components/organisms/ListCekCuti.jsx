/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import CardCekCuti from '../molecules/CardCekCuti';
import {text} from '../../utils/text';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Kalender from '../molecules/Kalender';

const ListCekCuti = () => {
  const [showKalender, setShowKalender] = useState(false);

  const handleCalender = () => {
  setShowKalender(!showKalender);
};
console.log(showKalender)
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>CEK CUTI</Text>
      <View style={styles.backgroundCardCekCuti}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingLeft: 20,
          }}>
          <Text
            style={{
              fontFamily: text.semiBold,
              marginHorizontal: 20,
              color: Color.black,
            }}>
            Tanggal
          </Text>
          <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
            Sep 15 2023
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
          <CardCekCuti />
        </ScrollView>
      </View>
      <TouchableOpacity  style={{position:'absolute', bottom: 30, right: 34}} onPress={handleCalender}>
      <FontAwesomeIcon icon={faCalendarAlt} size={50} color={Color.blue} />
      </TouchableOpacity>
      {showKalender && <View style={{position:'absolute', bottom: 80, right: 34}}><Kalender /></View> }
    </View>
  );
};

export default ListCekCuti;

const styles = StyleSheet.create({
  backgroundCardCekCuti: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
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
  Kalender: {
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
});