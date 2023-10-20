/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardReimburse from '../molecules/CardReimburse';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';

const ListReimburse = ({navigation}) => {
  const [reimburse, setReimburse] = useState([
    {
      tanggal: 'Senin 2 Mei',
      totalJam: 8,
      overtime: 0,
      transport: 50000,
      uangMakan: 50000,
    },
    {
      tanggal: 'Senin 3 Mei',
      totalJam: 8,
      overtime: 2,
      transport: 20000,
      uangMakan: 50000,
    },
    {
      tanggal: 'Senin 4 Mei',
      totalJam: 2,
      overtime: 9,
      transport: 50000,
      uangMakan: 100000,
    },
    {
      tanggal: 'Senin 5 Mei',
      totalJam: 8,
      overtime: 2,
      transport: 50000,
      uangMakan: 220000,
    },
    {
      tanggal: 'Senin 6 Mei',
      totalJam: 8,
      overtime: 1,
      transport: 50000,
      uangMakan: 150000,
    },
  ]);
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 20, right: 20}}
      />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>Reimburse</Text>
      <View style={styles.backgroundCardReimburse}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {reimburse.map((reimburse, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardReimburse
                navigation={navigation}
                tanggal={reimburse.tanggal}
                totalJam={reimburse.totalJam}
                overtime={reimburse.overtime}
                transport={reimburse.transport}
                uangMakan={reimburse.uangMakan}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.catatanKerja}>
          <View style={{alignItems: 'flex-start'}}>
            <>
              <Text style={{fontFamily: text.lightItalic}}>Reimburse </Text>
              <Text style={styles.textValue}>Rp. 0</Text>
            </>
            <>
              <Text style={{fontFamily: text.lightItalic}}>Data + Voice </Text>
              <Text style={styles.textValue}>Rp. 150.000</Text>
            </>
            <>
              <Text style={{fontFamily: text.lightItalic}}>Lain-lain </Text>
              <Text style={styles.textValue}>Rp. 0</Text>
            </>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <>
              <Text style={{fontFamily: text.lightItalic}}>Total </Text>
              <Text style={[styles.textValue, {fontSize: 16}]}>
                Rp. 150.000
              </Text>
            </>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListReimburse;

const styles = StyleSheet.create({
  backgroundCardReimburse: {
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
    textTransform: 'uppercase',
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
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: 10,
  },
});
