/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import CardBelumAbsenPulang from '../molecules/CardBelumAbsenPulang';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import axios from 'axios';
import SkeletonCardAbsenBelumPulang from '../skeleton/SkeletonCardAbsenBelumPulang';
import LottieView from 'lottie-react-native';

const ListBelumAbsenPulang = ({navigation}) => {
  const [AbsenBelumPulang, setAbsenBelumPulang] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

const getDataBelumAbsen = async headers => {
  try {
    const response = await axios.get(
      API_GABUNGAN + '/api/absen/get-absen-belum-pulang',
      { headers },
    );
    console.log(response.data.data);
    const dataAPI = response.data.data;

    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = new Date().toISOString().split('T')[0];

    // Filter out the data where "tglAbsen" is equal to the current date
    const filteredData = dataAPI.filter(item => item.tglAbsen !== currentDate);

    setAbsenBelumPulang(filteredData);
    setIsLoading(false);
    console.log('data : ', filteredData);
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
        getDataBelumAbsen(headers);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('30%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Belum Absen Pulang</Text>
      </View>
      <View style={styles.backgroundCardBelumAbsenPulang}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={{gap: 15}}>
              <SkeletonCardAbsenBelumPulang />
              <SkeletonCardAbsenBelumPulang />
              <SkeletonCardAbsenBelumPulang />
              <SkeletonCardAbsenBelumPulang />
            </View>
          ) : AbsenBelumPulang.length > 0 ? (
            AbsenBelumPulang.map((data, index) => (
              <View key={index} style={{flexDirection: 'column'}}>
                <CardBelumAbsenPulang
                  navigation={navigation}
                  jam_masuk={data.jamMsk}
                  project={data.projectName}
                  note_telat={data.noteTelatMsk}
                  lokasi={data.lokasiProject}
                  tanggal={data.tglAbsen}
                />
              </View>
            ))
          ) : (
            <View style={styles.wrapDataNotFound}>
              <LottieView
                source={require('../../assets/animation/ThumbUp.json')}
                autoPlay
                style={{
                  width: '150%',
                  height: '70%',
                }}></LottieView>
              <Text style={styles.textDataNotFound}>
                Tidak Ada Data Absen Pulang
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListBelumAbsenPulang;

const styles = StyleSheet.create({
  backgroundCardBelumAbsenPulang: {
    backgroundColor: Color.white,
    paddingTop: 30,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -70,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
  wrapDataNotFound: {
    width: wp('70%'),
    height: hp('60%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDataNotFound: {
    fontFamily: text.semiBold,
    color: Color.blue,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
