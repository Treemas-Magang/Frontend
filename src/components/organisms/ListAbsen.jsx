/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardListAbsen from '../molecules/CardListAbsen';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import LottieView from 'lottie-react-native';
import SkeletonCardAbsen from '../skeleton/SkeletonCardAbsen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListAbsen = ({navigation}) => {
  const [dataAbsens, setDataAbsens] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const getDataAbsen = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-rekap-absen',
        {
          headers,
        },
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;

      console.log('data Absen : ', dataAPI);
      setDataAbsens(dataAPI);

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
        getDataAbsen(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const moveTo = (tujuan, id) => {
    navigation.navigate(tujuan, {id: id});
  };

  const formatDate = dateString => {
    // Mengasumsikan dateString dalam format 'YYYY-MM-DD'
    const date = new Date(dateString);

    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };

    // Menggunakan toLocaleDateString untuk mendapatkan format tanggal default
    let formattedDate = date.toLocaleDateString('id-ID', options);

    // Mengganti koma setelah hari dengan string kosong
    formattedDate = formattedDate.replace(/,/g, '');

    return formattedDate;
  };

  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapAbsen}>
        <Text style={styles.judul}>ABSEN</Text>
      </View>
      <View style={styles.wrapCardAbsen}>
        {isLoading ? (
          // <ActivityIndicator />
          <View style={styles.wrapSkeleton}>
            <SkeletonCardAbsen />
            <SkeletonCardAbsen />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataAbsens.length > 0 ? (
              dataAbsens?.map((dataAbsen, index) => (
                <View key={index} style={{flexDirection: 'column'}}>
                  <CardListAbsen
                    onPress={() => moveTo('detailAbsen', dataAbsen.id)}
                    navigation={navigation}
                    tanggal_absen={formatDate(dataAbsen.tglAbsen) || '-'}
                    jam_masuk={
                      dataAbsen.jamMsk ? dataAbsen.jamMsk.substring(0, 5) : '-'
                    }
                    jam_pulang={
                      dataAbsen.jamPlg ? dataAbsen.jamPlg.substring(0, 5) : '-'
                    }
                    lokasi_masuk={dataAbsen.lokasiMsk || '-'}
                    lokasi_pulang={dataAbsen.lokasiPlg || '-'}
                    status={
                      dataAbsen.status === 'Absen'
                        ? 'Absen'
                        : dataAbsen.status === 'Sakit'
                        ? 'Sakit'
                        : dataAbsen.status === 'Libur'
                        ? 'Libur'
                        : ''
                    }
                  />
                </View>
              ))
            ) : (
              // Handle the case when dataApp is not an array
              <View style={styles.wrapDataNotFound}>
                <LottieView
                  source={require('../../assets/animation/dataNotFound.json')}
                  autoPlay
                  style={{
                    width: '100%',
                    height: '70%',
                  }}></LottieView>
                <Text style={styles.textDataNotFound}>
                  Tidak Ada Data Absen
                </Text>
              </View>
            )}
          </ScrollView>
        )}
        <View style={styles.wrapStatus}>
          <View style={styles.simbolStatus} />
          <Text>Sakit/Izin</Text>
        </View>
      </View>
    </View>
  );
};

export default ListAbsen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapAbsen: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardAbsen: {
    flex: 6,
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    backgroundColor: Color.cardSakit,
    borderRadius: 15,
  },
  wrapDataNotFound: {
    width: wp('90%'),
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
  wrapSkeleton: {
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: 10,
  },
});
