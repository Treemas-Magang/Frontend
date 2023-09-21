import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const CardNotif = () => {
  return (
    <TouchableOpacity style={styles.CardNotifStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/icons/Pesan.png')}
          style={styles.Image}
        />
        <View>
          <Text style={{fontFamily: 'Poppins-ExtraLightItalic', fontSize: 10}}>
            20 MEI 2023
          </Text>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>
            Jam Kerja Selama Ramadhan
          </Text>
          <Text
            style={{fontFamily: 'Poppins-Regular', fontSize: 10, width: 177}}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy . . . . .
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardNotif;

const styles = StyleSheet.create({
  CardNotifStyle: {
    backgroundColor: Color.green,
    width: 320,
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  Image: {
    width: 70,
    height: 70,
    marginHorizontal: 15,
  },
});
