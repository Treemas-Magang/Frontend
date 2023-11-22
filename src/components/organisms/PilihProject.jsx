/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import CardPilihProject from '../molecules/CardPilihProject';
import {text} from '../../utils/text';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';

const PilihProject = ({navigation, ukuranWrappPilihProject}) => {
  const [pilihProjects, setPilihProject] = useState([]);
  // const [pilihProjects, setPilihProject] = useState([
  //   {
  //     nama: 'PT TREEMAS SOLUSI UTAMA',
  //     alamat:
  //       'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15326, Indonesia',
  //     projectId: 'PROJ001',
  //   },
  //   {
  //     nama: 'Bank UOB',
  //     alamat:
  //       'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15327, Indonesia',
  //   },
  //   {
  //     nama: 'BANK ANDALAN RAKYAT',
  //     alamat:
  //       'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15328, Indonesia',
  //   },
  //   {
  //     nama: 'Bank MEGA',
  //     alamat:
  //       'jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec Serpong utara Kota Tangerang Selatan, Banten 15329, Indonesia',
  //   },
  // ]);
  const getDataPenempatan = async headers => {
    try {
      const response = await axios.get(
        'http://192.168.10.31:8081/api/absen/get-all-projects',
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      const newData = dataAPI.filter(item => item.active === '1');
      setPilihProject(newData);
      console.log('data : ', newData);
    } catch (error) {}
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataPenempatan(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const moveTo = (tujuan, namaTempat, alamat, projectId) => {
    navigation.navigate(tujuan, {
      namaTempat: namaTempat,
      alamat: alamat,
      projectId: projectId,
    });
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
                nama={pilihProject.projectName}
                alamat={pilihProject.projectAddress}
                navigation={navigation}
                onPress={() =>
                  moveTo(
                    'pilihAbsenProject',
                    pilihProject.projectName,
                    pilihProject.projectAddress,
                    pilihProject.projectId,
                  )
                }
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
