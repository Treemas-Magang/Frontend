/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import CardPilihProject from '../molecules/CardPilihProject';
import {text} from '../../utils/text';

const PilihProject = ({navigation, ukuranWrappPilihProject}) => {
  const [pilihProjects, setPilihProject] = useState([
    {
      nama: 'PT TREEMAS SOLUSI UTAMA',
      alamat:
        'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15326, Indonesia',
      projectId: 'PROJ001',
    },
    {
      nama: 'Bank UOB',
      alamat:
        'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15327, Indonesia',
    },
    {
      nama: 'BANK ANDALAN RAKYAT',
      alamat:
        'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15328, Indonesia',
    },
    {
      nama: 'Bank MEGA',
      alamat:
        'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15329, Indonesia',
    },
  ]);
  const moveTo = (tujuan, namaTempat, alamat, projectId) => {
    navigation.navigate(tujuan, {namaTempat: namaTempat, alamat: alamat, projectId: projectId});
  };
  return (
    <View>
      <View style={[styles.wrappPilihProject, ukuranWrappPilihProject]}>
        <Text
          style={{
            fontFamily: text.semiBold,
            textTransform: 'uppercase',
            fontSize: 17,
            color: Color.blue,
          }}>
          Project Yang Di Pilih
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {pilihProjects.map((pilihProject, index) => (
            <View key={index}>
              <CardPilihProject
                nama={pilihProject.nama}
                alamat={pilihProject.alamat}
                navigation={navigation}
                onPress={() => moveTo('pilihAbsenProject', pilihProject.nama, pilihProject.alamat, pilihProject.projectId)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PilihProject;

const styles = StyleSheet.create({
  wrappPilihProject: {
    backgroundColor: Color.white,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 30,
  },
});
