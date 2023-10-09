/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardReimburse from '../molecules/CardReimburse';

const ListReimburse = ({navigation}) => {
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>Reimburse</Text>
      <View style={styles.backgroundCardReimburse}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardReimburse navigation={navigation} />
          <CardReimburse navigation={navigation} />
          <CardReimburse navigation={navigation} />
          <CardReimburse navigation={navigation} />
          <CardReimburse navigation={navigation} />
          <CardReimburse navigation={navigation} />
        </ScrollView>
        <View style={styles.catatanKerja}>
          <View style={{alignItems: 'flex-start'}}>
            <>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>Reimburse </Text>
            <Text style={styles.textValue}>Rp. 0</Text>
            </>
            <>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>Data + Voice </Text>
            <Text style={styles.textValue}>Rp. 150.000</Text>
            </>
            <>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>Lain-lain </Text>
            <Text style={styles.textValue}>Rp. 0</Text>
            </>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <>
            <Text style={{fontFamily: 'Poppins-LightItalic'}}>Total </Text>
            <Text style={[styles.textValue,{fontSize: 16}]}>Rp. 150.000</Text>
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
    justifyContent:'space-evenly'
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: 10
  },
});