/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardBelumAbsenPulang = ({
  navigation,
  tanggal,
  jam_masuk,
  project,
  note_telat,
  lokasi,
}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.CardBelumAbsenPulangStyle}
        onPress={() => moveTo('formAbsenBelumPulang')}>
        <View
          style={{
            width: '100%',
            paddingLeft: 20,
          }}>
          <Text
            style={{
              fontFamily: text.semiBold,
              marginHorizontal: 15,
              color: Color.black,
              paddingTop: 10,
            }}>
            {tanggal}
          </Text>
        </View>
        <View style={styles.CardDalemTimesheetStyle}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <View>
              <Text style={styles.textTitle}>Jam Masuk</Text>
              <Text style={styles.textDeskripsi}>{jam_masuk}</Text>
            </View>
            <View>
              <Text style={styles.textTitle}>Project</Text>
              <Text style={styles.textDeskripsi}>{project}</Text>
            </View>
          </View>
          <Text style={styles.textTitle}>Note Telat</Text>
          <Text style={styles.textDeskripsi}>{note_telat}</Text>
          <Text style={styles.textTitle}>Lokasi</Text>
          <Text
            style={{
              fontFamily: text.semiBold,
              fontSize: 12,
              width: 224,
              textAlign: 'justify',
              color: Color.brown,
            }}>
            {lokasi}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardBelumAbsenPulang;

const styles = StyleSheet.create({
  CardBelumAbsenPulangStyle: {
    backgroundColor: Color.green,
    width: 320,
    height: 250,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemTimesheetStyle: {
    backgroundColor: Color.white,
    width: 260,
    height: 180,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  textTitle: {
    fontFamily: text.lightItalic,
    fontSize: 12,
  },
  textDeskripsi: {
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
});
