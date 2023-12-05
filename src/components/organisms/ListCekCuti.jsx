/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import CardCekCuti from '../molecules/CardCekCuti';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import Kalender from '../molecules/Kalender';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import axios from 'axios';
import {API_URL, API_GABUNGAN} from '@env';
import {getDataFromSession} from '../../utils/getDataSession';
import SkeletonCardCekCuti from '../skeleton/SkeletonCardCekCuti';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getTanggalSekarang} from '../../utils/getTanggalSekarang';
const ListCekCuti = ({navigation}) => {
  const [showKalender, setShowKalender] = useState(false);
  const [cekCutis, setcekCutis] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const [tglSekarang, setTglSekarang] = useState(null); // Set initial loading state to true

  console.log('tanggal sekarang dari f : ', getTanggalSekarang().date);
  useEffect(() => {
    setTglSekarang(getTanggalSekarang().date);
  }, []);
  console.log('tgl sekarang : ', tglSekarang);
  const getDataCuti = async headers => {
    try {
      let apiUrl = API_GABUNGAN + '/api/absen/cek-cuti-by?date=' + tglSekarang; // Change this to the appropriate API endpoint

      const response = await axios.get(apiUrl, {
        headers,
      });

      console.log(response.data);
      const dataAPI = response.data.data;
      setcekCutis(dataAPI);
      setIsLoading(false);
      console.log('data : ', dataAPI);
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
        getDataCuti(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCalender = () => {
    setShowKalender(!showKalender);
  };
  console.log(showKalender);
  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapCekCuti}>
        <Text style={styles.judul}>CEK CUTI</Text>
      </View>
      <View style={styles.backgroundCardCekCuti}>
        <View style={styles.wrapTanggal}>
          <Text style={{fontFamily: text.semiBold, color: Color.black}}>
            Tanggal
          </Text>
          <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
            {tglSekarang}
          </Text>
        </View>
        <ScrollView
          style={{maxHeight: 570}}
          showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={{gap: 15}}>
              <SkeletonCardCekCuti />
              <SkeletonCardCekCuti />
              <SkeletonCardCekCuti />
              <SkeletonCardCekCuti />
              <SkeletonCardCekCuti />
            </View>
          ) : cekCutis !== null ? (
            cekCutis.map((cekCuti, index) => (
              <View key={index} style={{flexDirection: 'column'}}>
                <CardCekCuti nik={cekCuti.nik} nama={cekCuti.nama} />
              </View>
            ))
          ) : (
            <View style={styles.wrapDataNotFound}>
              <LottieView
                source={require('../../assets/animation/dataNotFound.json')}
                autoPlay
                style={{
                  width: '150%',
                  height: '60%',
                }}></LottieView>
              <Text style={styles.textDataNotFound}>
                Tidak ada yang cuti hari ini
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 30, right: 34}}
        onPress={handleCalender}>
        <FontAwesomeIcon icon={faCalendarAlt} size={50} color={Color.blue} />
      </TouchableOpacity>
      {showKalender && (
        <View style={{position: 'absolute', bottom: 80, right: 34}}>
          <Kalender onDataTglHariIni={data => setTglSekarang(data)} />
        </View>
      )}
    </View>
  );
};

export default ListCekCuti;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapCekCuti: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCardCekCuti: {
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
  Kalender: {
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
    alignItems: 'center',
  },
  wrapTanggal: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    left: 45,
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
