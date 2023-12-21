/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardReimburse from '../molecules/CardReimburse';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import LottieView from 'lottie-react-native';
import SkeletonCardReimburse from '../skeleton/SkeletonCardReimburse';

const ListReimburse = ({navigation}) => {
  const [reimburses, setReimburses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const getDataReimburse = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-rekap-reimburse',
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      console.log('data reimburse : ', dataAPI);
      setReimburses(dataAPI);
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
        getDataReimburse(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const [isShowCatatanKerja, setIsShowCatatanKerja] = useState(false);
  const showCatatanKerja = () => {
    setIsShowCatatanKerja(!isShowCatatanKerja);
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

  const moveTo = (tujuan, id) => {
    navigation.navigate(tujuan, {id: id});
  };

  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />

      <View style={styles.containerJudul}>
        <Text style={styles.Judul}>reimburse</Text>
      </View>
      <View style={styles.content}>
        {isLoading ? (
          <View style={{flex: 1}}>
            <SkeletonCardReimburse />
            <SkeletonCardReimburse />
            <SkeletonCardReimburse />
            <SkeletonCardReimburse />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {reimburses.length > 0 ? (
              reimburses.map((reimburse, index) => (
                <View key={index}>
                  <CardReimburse
                    navigation={navigation}
                    onPress={() => moveTo('detailReimburse', reimburse.id)}
                    tanggal={formatDate(reimburse.tanggal) || '-'}
                    totalJam={reimburse.totalJamKerja}
                    overtime={reimburse.overtime}
                    transport={reimburse.transport}
                    uangMakan={reimburse.uangMakan}
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
                  Tidak Ada Data Reimburse
                </Text>
              </View>
            )}
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={showCatatanKerja}
          style={
            isShowCatatanKerja ? styles.btnOnInvoice : styles.btnOffInvoice
          }>
          <FontAwesomeIcon
            icon={isShowCatatanKerja ? faAngleDoubleDown : faAngleDoubleUp}
            size={30}
            color={Color.white}
          />
        </TouchableOpacity>
        <View
          style={
            isShowCatatanKerja
              ? styles.tampilkanCatatanKerja
              : styles.dontShowCatatanKerja
          }>
          <View style={styles.catatanKerja}>
            <View style={{alignItems: 'flex-start'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>Reimburse </Text>
                <Text style={styles.textValue}>Rp. 0</Text>
              </>
              <>
                <Text style={{fontFamily: text.lightItalic}}>
                  Data + Voice{' '}
                </Text>
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
    </View>
  );
};

export default ListReimburse;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.green,
    flex: 1,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  catatanKerja: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Color.black,
    width: wp('80%'),
    minHeight: hp('15%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: 10,
  },
  dontShowCatatanKerja: {
    backgroundColor: 'blue',
    minHeight: hp('10%'),
    width: wp('100%'),
    position: 'absolute',
    bottom: -150,
    alignItems: 'center',
  },
  tampilkanCatatanKerja: {
    // backgroundColor: 'blue',
    minHeight: hp('10%'),
    width: wp('100%'),
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  btnOffInvoice: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    backgroundColor: Color.black,
    position: 'absolute',
    bottom: 10,
    right: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOnInvoice: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    backgroundColor: Color.black,
    position: 'absolute',
    bottom: 140,
    right: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Color.white,
    flex: 5,
    position: 'relative',
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 35,
  },
  containerJudul: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapDataNotFound: {
    width: wp('90%'),
    height: hp('55%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDataNotFound: {
    fontFamily: text.semiBold,
    color: Color.blue,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
