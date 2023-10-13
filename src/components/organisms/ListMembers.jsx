/* eslint-disable prettier/prettier */
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CardMember from '../molecules/CardMember';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

const ListMembers = () => {
  return (
    <View style={styles.listMember}>
      <View style={{paddingVertical: 70}}>

      </View>
      <View style={styles.wrapListMember}>
      <TouchableOpacity  style={styles.iconDrop}>
        <FontAwesomeIcon icon={faArrowDownShortWide} size={30} color={Color.blue} />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.judul}>MEMBER</Text>
        <Text style={styles.judul}>MANDIRI</Text>
      </View>
      <View style={styles.wrapStatus}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
          <View style={[styles.simbolStatus, {backgroundColor: Color.cardMasuk}]} />
          <Text>Hadir</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
          <View style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]} />
          <Text>Cuti</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
          <View style={[styles.simbolStatus, {backgroundColor: Color.cardTidakMasuk}]} />
          <Text>Tidak masuk</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
          <View style={[styles.simbolStatus, {backgroundColor: Color.cardSakit}]} />
          <Text>Sakit/izin</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{gap: 20}}>
          <CardMember />
          <CardMember />
          <CardMember />
          <CardMember />
          <CardMember />
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default ListMembers;

const styles = StyleSheet.create({
  listMember:{
    backgroundColor: Color.green,
    width: '100%',
    height: '100%',
  },
  wrapListMember:{
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
    paddingVertical: 5,
  },
  judul:{
    fontFamily: text.semiBold,
    fontSize: 24,
    color: Color.blue,
  },
  iconDrop:{
    position: 'absolute',
    left: 30,
    top: 25,
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: 5,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});
