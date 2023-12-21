/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import {API_URL, API_GABUNGAN, API_KEY_MAP_ALAMAT} from '@env';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {useRoute} from '@react-navigation/native';
import SkeletonDetailMember from '../skeleton/SkeletonDetailMember';
import { getAlamat } from '../../utils/getAlamat';

const lokasiUser = [
  {latitude: 0.001, longitude: 0.001, title: 'Marker 1'},
  {latitude: 0.002, longitude: 0.002, title: 'Marker 2'},
  {latitude: 0.003, longitude: 0.003, title: 'Marker 3'},
];


const DetailMember = ({navigation, stylePP}) => {
  const {nikMember} = useRoute().params;
  console.log('nik : ', nikMember);
  const [isLoading, setIsLoading] = useState(true);
  const [isWFH, setIsWFH] = useState(true);
  const [dataDetailMember, setDataDetailMember] = useState([]);
  const [alamatMsk, setAlamatMsk] = useState('');
  const [alamatPlg, setAlamatPlg] = useState('');
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
  const { absenTrackingData } = dataDetailMember;

  if (
    absenTrackingData &&
    absenTrackingData.gpsLatitudeMsk &&
    absenTrackingData.gpsLongitudeMsk &&
    absenTrackingData.gpsLatitudeMsk.every(lat => lat !== null) &&
    absenTrackingData.gpsLongitudeMsk.every(lon => lon !== null)
  ) {
    const mskMarkers = extractMarkers(
      absenTrackingData.gpsLatitudeMsk,
      absenTrackingData.gpsLongitudeMsk,
    );

    const plgMarkers = [];
    if (
      absenTrackingData.gpsLatitudePlg !== null &&
      absenTrackingData.gpsLongitudePlg !== null
    ) {
      plgMarkers.push({
        latitude: absenTrackingData.gpsLatitudePlg,
        longitude: absenTrackingData.gpsLongitudePlg,
        title: 'Marker Plg',
      });
    }

    const combinedMarkers = [...mskMarkers, ...plgMarkers];
    setMarkers(combinedMarkers);
  }
}, [dataDetailMember]);


  useEffect(() => {
    // Assuming dataDetailMember is the response data
    const {absenTrackingData} = dataDetailMember;

    if (absenTrackingData) {
      const mskMarkers = extractMarkers(
        absenTrackingData.gpsLatitudeMsk,
        absenTrackingData.gpsLongitudeMsk,
      );

      // Check for null values in Plg data
      const plgMarkers = [];
      if (
        absenTrackingData.gpsLatitudePlg !== null &&
        absenTrackingData.gpsLongitudePlg !== null
      ) {
        plgMarkers.push({
          latitude: absenTrackingData.gpsLatitudePlg,
          longitude: absenTrackingData.gpsLongitudePlg,
          title: 'Marker Plg',
        });
      }

      const combinedMarkers = [...mskMarkers, ...plgMarkers];
      setMarkers(combinedMarkers);
    }
  }, [dataDetailMember]);

  // Add this null check for extractMarkers function
  const extractMarkers = (latitudes, longitudes) => {
    if (
      latitudes &&
      longitudes &&
      Array.isArray(latitudes) &&
      Array.isArray(longitudes) &&
      latitudes.length === longitudes.length
    ) {
      return latitudes.map((latitude, index) => ({
        latitude,
        longitude: longitudes[index],
        title: `Marker ${index + 1}`,
      }));
    }
    return [];
  };

  console.log('hasil markers : ', markers);

  const getDataDetailMember = async headers => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_GABUNGAN + `/api/member/get-data-absen?nik=${nikMember}`,
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      setDataDetailMember(dataAPI);
      setIsLoading(false);
    } catch (error) {
      console.log('Tidak dapat mengambil data ', error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataDetailMember(headers);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // Mengambil indeks terbaru yang tidak bernilai null
    const absenTrackingData = dataDetailMember?.absenTrackingData || {};
    const gpsLatMasuk = absenTrackingData.gpsLatitudeMsk || [];
    const gpsLongMasuk = absenTrackingData.gpsLongitudeMsk || [];
    let latestNonNullLatValue = null;
    let latestNonNullLongValue = null;

    // Get latest non-null value for Latitude
    for (let index = gpsLatMasuk.length - 1; index >= 0; index--) {
      const element = gpsLatMasuk[index];

      if (element !== null) {
        latestNonNullLatValue = element;
        break; // Stop iterating once a non-null value is found
      }
    }

    // Get latest non-null value for Longitude
    for (let index = gpsLongMasuk.length - 1; index >= 0; index--) {
      const element = gpsLongMasuk[index];

      if (element !== null) {
        latestNonNullLongValue = element;
        break; // Stop iterating once a non-null value is found
      }
    }

    console.log('Latest non-null Latitude value: ', latestNonNullLatValue);
    console.log('Latest non-null Longitude value: ', latestNonNullLongValue);

    getAlamat(latestNonNullLatValue, latestNonNullLongValue, API_KEY_MAP_ALAMAT)
      .then(alamat_msk => {
        console.log(alamat_msk);
        setAlamatMsk(alamat_msk);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });

    if (
      absenTrackingData.gpsLatitudePlg !== null &&
      absenTrackingData.gpsLongitudePlg !== null
    ) {
      getAlamat(
        absenTrackingData.gpsLatitudePlg,
        absenTrackingData.gpsLongitudePlg,
        API_KEY_MAP_ALAMAT,
      )
        .then(alamat_plg => {
          console.log('lokasi plg : ', alamat_plg);
          setAlamatPlg(alamat_plg);
          setIsLoading(false);
        })
        .catch(error => {
          console.log('asu : ', error);
          setIsLoading(false);
        });
    } else {
      setAlamatPlg('belum absen pulang');
    }
  }, [dataDetailMember]); // Tambahkan dependensi sesuai kebutuhan

  const moveTo = (tujuan, dataTracking) => {
    navigation.navigate(tujuan, {mapTraking: dataTracking});
  };
  return isLoading ? (
    <SkeletonDetailMember />
  ) : (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>member Hadir</Text>
      </View>
      <View style={styles.backgroundDetailMember}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <View>
              <Image
                source={require('../../assets/vector/user.png')}
                style={[styles.pp, stylePP]}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              gap: 5,
              right: 0,
            }}>
            <TouchableOpacity onPress={() => moveTo('mapTracking', markers)}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/vector/Maps.png')}
              />
            </TouchableOpacity>
            {isWFH ? (
              <TouchableOpacity>
                <FontAwesomeIcon icon={faImage} color={Color.green} size={40} />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
          <View>
            <Text style={styles.TextTitle}>Nik</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.nik || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nama</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.nama || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Project</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.namaProject || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.jamMsk || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Masuk</Text>
            <Text
              style={{
                textAlign: 'justify',
                fontFamily: text.light,
                marginVertical: 2,
              }}>
              {alamatMsk}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Telat</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.catatanTelat || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Keluar</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.jamPlg === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.absenTrackingData?.jamPlg || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Keluar</Text>
            <Text
              style={{
                textAlign: 'justify',
                fontFamily: text.light,
                marginVertical: 2,
              }}>
              {alamatPlg === null ? 'Belum Absen Keluar' : alamatPlg || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Pulang Cepat</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.catatanPlgCpt === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.absenTrackingData?.catatanPlgCpt || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Timesheet</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.absenTrackingData?.notePekerjaan === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.absenTrackingData?.notePekerjaan || 'N/A'}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailMember;

const styles = StyleSheet.create({
  backgroundDetailMember: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
  },
  TextDeskripsi: {
    fontFamily: text.light,
    marginVertical: 2,
  },
});
