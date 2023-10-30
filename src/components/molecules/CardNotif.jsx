/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardNotif = ({navigation, open}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <TouchableOpacity
      style={[
        styles.CardNotifStyle,
        open
          ? {backgroundColor: Color.cardTidakMasuk}
          : {backgroundColor: Color.green},
      ]}
      onPress={() => moveTo('detailPengumuman')}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {open ? (
          <Image
            source={require('../../assets/icons/PesanTerbuka.png')}
            style={styles.Image}
          />
        ) : (
          <Image
            source={require('../../assets/icons/Pesan.png')}
            style={styles.Image}
          />
        )}

        <View>
          <Text style={{fontFamily: text.lightItalic, fontSize: 10}}>
            20 MEI 2023
          </Text>
          <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
            Jam Kerja Selama Ramadhan
          </Text>
          <Text style={{fontFamily: text.regular, fontSize: 10, width: 177}}>
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
