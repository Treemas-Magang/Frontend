/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardPilihProject = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.CardPilihProject}>
        <Text style={styles.Text}>ANDALAN FINANCE INDONESIA</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </View>
      <View style={styles.CardPilihProject}>
        <Text style={styles.Text}>TREEMAS SOLUSI UTAMA</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </View>
      <View style={styles.CardPilihProject}>
        <Text style={styles.Text}>OTHER</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </View>
      <View style={styles.CardPilihProject}>
        <Text style={styles.Text}>OTHER</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </View>
    </ScrollView>
  );
};

export default CardPilihProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: 269,
    minHeight: 100,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
    paddingVertical: 10,
  },
  TextDeskripsi: {
    fontFamily: text.extraLight,
    fontSize: 10,
    marginBottom: 20,
    color: Color.black,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
});
