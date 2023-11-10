/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasBesar from '../atoms/VectorAtasBesar';
import CardMemberProject from '../molecules/CardMemberProject';

const ListMemberProject = ({navigation}) => {
  const [namaMembers, setNamaMember] = useState([
    {
      nama: 'Bank UOB',
    },
    {
      nama: 'GRAHA TELKOMSIGMA',
    },
    {
      nama: 'BANK PERMATA',
    },
    {
      nama: 'MANDIRI',
    },
    {
      nama: 'PT MITRA TRANSAKSI INDONESIA',
    },
    {
      nama: 'PT TREEMAS SOLUSI UTAMA',
    },
  ]);
  return (
    <View style={styles.listMember}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <View style={{paddingVertical: 55}}></View>
      <View style={styles.wrapListMember}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text style={styles.judul}>MEMBER</Text>
          <Text style={styles.judul}>PROJECT</Text>
        </View>
        <View style={styles.wrapStatus}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardMasuk}]}
            />
            <Text>Hadir</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]}
            />
            <Text>Cuti</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[
                styles.simbolStatus,
                {backgroundColor: Color.cardTidakMasuk},
              ]}
            />
            <Text>Tidak masuk</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardSakit}]}
            />
            <Text>Sakit/izin</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {namaMembers.map((namaMember, index) => (
            <View key={index}>
              <CardMemberProject
                nama={namaMember.nama}
                navigation={navigation}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListMemberProject;

const styles = StyleSheet.create({
  listMember: {
    backgroundColor: Color.green,
    width: '100%',
    height: '100%',
  },
  wrapListMember: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
    paddingVertical: 5,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 24,
    color: Color.blue,
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
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
