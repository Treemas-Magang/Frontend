/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import CardPilihProject from '../molecules/CardPilihProject';
import {text} from '../../utils/text';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import SkeletonCardPilihProject from '../skeleton/SkeletonCardPilihProject';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { setProjectYangDipilih } from '../../redux';

const PilihProject = ({navigation, ukuranWrappPilihProject}) => {
  const dispatch = useDispatch();
  const [pilihProjects, setPilihProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  const getDataPenempatan = async headers => {
    try {
      const response = await axios.get(
        'http://192.168.10.31:8081/api/absen/get-all-projects',
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      const newData = dataAPI.filter(item => item.active === '1');
      // const dataKosong = [];
      setPilihProject(newData);
      setIsLoading(false);
      console.log('data : ', newData);
    } catch (error) {
      console.log('Tidak dapat mengambil data ', error);
      setIsLoading(false);
    }
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

  const moveTo = (tujuan, namaTempat, alamat, projectId, gpsLatProj, gpsLongProj, jrkMax, jmMsk, jmklr) => {
    dispatch(setProjectYangDipilih('namaTempat', namaTempat));
    dispatch(setProjectYangDipilih('alamat', alamat));
    dispatch(setProjectYangDipilih('projectId', projectId));
    dispatch(setProjectYangDipilih('gpsLatProj', gpsLatProj));
    dispatch(setProjectYangDipilih('gpsLongProj', gpsLongProj));
    dispatch(setProjectYangDipilih('jrkMax', jrkMax));
    dispatch(setProjectYangDipilih('jamMasuk', jmMsk));
    dispatch(setProjectYangDipilih('jamKeluar', jmklr));
    navigation.navigate(tujuan);
  };
  return (
    <View>
      <View style={[styles.wrappPilihProject, ukuranWrappPilihProject]}>
        <Text style={styles.textPilihProject}>Project Yang Di Pilih</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={{gap: 1}}>
              <SkeletonCardPilihProject />
              <SkeletonCardPilihProject />
              <SkeletonCardPilihProject />
            </View>
          ) : pilihProjects.length > 0 ? (
            pilihProjects.map((pilihProject, index) => (
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
                    pilihProject.gpsLatitude,
                    pilihProject.gpsLongitude,
                    pilihProject.jrkMax,
                    pilihProject.jamMasuk,
                    pilihProject.jamKeluar,
                  )
                }
              />
            </View>
          ))
          ) : (
            <View style={styles.wrapDataNotFound}>
              <LottieView
                source={require('../../assets/animation/dataNotFound.json')}
                autoPlay
                style={{
                  width: '100%',
                  height: '70%',
                }}></LottieView>
              <Text style={styles.textDataNotFound}>Tidak Ada Data</Text>
            </View>
          )}

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
  wrapDataNotFound: {
    width: wp('50%'),
    height: hp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDataNotFound: {
    fontFamily: text.semiBold,
    color: Color.blue,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  textPilihProject: {
    fontFamily: text.semiBold,
    textTransform: 'uppercase',
    fontSize: 17,
    color: Color.blue,
  },
});
