/* eslint-disable prettier/prettier */
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
import CardTimesheet from '../molecules/CardTimesheet';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import LottieView from 'lottie-react-native';
import SkeletonCardTimesheet from '../skeleton/SkeletonCardTimesheet';

const ListTimesheet = ({navigation}) => {
  const [timesheet, setTimesheet] = useState([]);
  const [itunganTimesheet, setItunganTimesheet] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const getDataTimesheet = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-rekap-timesheet',
        {headers},
      );
      // console.log(response.data.data);
      const dataAPI = response.data.data;
      const sortByTanggal = dataAPI.sort(
        (a, b) => new Date(b.tglMsk) - new Date(a.tglMsk),
      );
      console.log('data timesheet : ', dataAPI);
      setTimesheet(sortByTanggal);
      setIsLoading(false);
    } catch (error) {
      console.log('Tidak dapat mengambil data ', error);
      setIsLoading(false);
    }
  };
  const getDataItunganTimesheet = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-itungan-timesheet',
        {headers},
      );
      // console.log(response.data.data);
      const dataAPI = response.data.data;
      console.log('data timesheet itungan : ', dataAPI);
      setItunganTimesheet(dataAPI);
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
        getDataTimesheet(headers);
        getDataItunganTimesheet(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const [isShowCatatanKerja, setIsShowCatatanKerja] = useState(false);
  const showCatatanKerja = () => {
    setIsShowCatatanKerja(!isShowCatatanKerja);
  };

  const moveTo = (tujuan, id) => {
    navigation.navigate(tujuan, {id: id});
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {weekday: 'long', day: 'numeric', month: 'long'};

    let formattedDate = date.toLocaleDateString('id-ID', options);
    formattedDate = formattedDate.replace(/,/g, '');

    return formattedDate;
  };

  // const [totalOvertime, setTotalOvertime] = useState(0);
  // const [totalJamReguler, setTotalJamReguler] = useState(0);
  // const [totalJamKerja, setTotalJamKerja] = useState(0);

  // useEffect(() => {
  //   // Fungsi untuk menghitung total overtime
  //   const calculateTotalOvertime = () => {
  //     const total = timesheet.reduce((acc, entry) => acc + entry.overtime, 0);
  //     setTotalOvertime(total);
  //   };

  //   // Panggil fungsi ketika komponen di-mount atau timesheetData berubah
  //   calculateTotalOvertime();
  // }, [timesheet]);

  // console.log('ini total overtime :', totalOvertime);

  // //menghitung jam reguler
  // useEffect(() => {
  //   // Fungsi untuk menghitung total jam reguler
  //   const calculateTotalJamReguler = () => {
  //     if (timesheet) {
  //       const total = timesheet.reduce(
  //         (acc, entry) => acc + entry.projectId.jamKerja,
  //         0,
  //       );
  //       setTotalJamReguler(total);
  //     }
  //   };

  //   // Panggil fungsi ketika komponen di-mount atau timesheetData berubah
  //   calculateTotalJamReguler();
  // }, [timesheet]);

  // //menghitung jam kerja
  // useEffect(() => {
  //   // Fungsi untuk menghitung total jam kerja
  //   const calculateTotalJamKerja = () => {
  //     if (timesheet) {
  //       const total = timesheet.reduce(
  //         (acc, entry) => acc + entry.totalJamKerja,
  //         0,
  //       );
  //       setTotalJamKerja(total);
  //     }
  //   };

  //   // Panggil fungsi ketika komponen di-mount atau timesheetData berubah
  //   calculateTotalJamKerja();
  // }, [timesheet]);

  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />

      <View style={styles.containerJudul}>
        <Text style={styles.Judul}>Timesheet</Text>
      </View>
      <View style={styles.content}>
        {isLoading ? (
          <View style={{flex: 1}}>
            <SkeletonCardTimesheet />
            <SkeletonCardTimesheet />
            <SkeletonCardTimesheet />
            <SkeletonCardTimesheet />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {timesheet?.length > 0 ? (
              timesheet.map((data, index) => (
                <View key={index} style={{flexDirection: 'column'}}>
                  <CardTimesheet
                    onPress={() => moveTo('detailTimesheet', data.id)}
                    navigation={navigation}
                    lokasi={data.projectId?.lokasi || '-'}
                    penempatan={data.projectId?.namaProject || '-'}
                    tanggal={formatDate(data.tglMsk) || '-'}
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
                  Tidak Ada Data Timesheet
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
            <View style={{alignItems: 'center'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>
                  Total Jam Reguler
                </Text>
                <Text style={styles.textValue}>
                  {itunganTimesheet.totalJamReguler} Jam
                </Text>
              </>
            </View>
            <View style={{alignItems: 'center'}}>
              <>
                <Text style={{fontFamily: text.lightItalic}}>
                  Total Jam Lembur
                </Text>
                <Text style={styles.textValue}>
                  {itunganTimesheet.totalJamLembur} Jam
                </Text>
              </>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontFamily: text.boldItalic, color: Color.black}}>
                Total Jam Kerja
              </Text>
              <Text style={styles.textValue}>
                {itunganTimesheet.totalJamKerja} Jam
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListTimesheet;

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
    minHeight: hp('5%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: wp('3.5%'),
    textAlign: 'center',
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
    bottom: 100,
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
