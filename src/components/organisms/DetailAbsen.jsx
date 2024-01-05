import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import {useRoute} from '@react-navigation/native';
import SkeletonDetailAbsen from '../skeleton/SkeletonDetailAbsen';

const DetailAbsen = ({navigation}) => {
  const {id} = useRoute().params;
  const [dataDetailAbsen, setDataDetailAbsen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDataDetailAbsen = async headers => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_GABUNGAN + `/api/rekap/get-detail-absen?id=${id}`,
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      // const dataKosong = [];
      setDataDetailAbsen(dataAPI);
      console.log('ini data detail absen', dataAPI);
      setIsLoading(false);
      // console.log('data : ', dataAPI.absenEntity);
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
        getDataDetailAbsen(headers);
      })
      .catch(error => console.log(error));
  }, []);

  // const formatDate = dateString => {
  //   // Mengasumsikan dateString dalam format 'YYYY/MM/DD'
  //   const date = new Date(dateString);

  //   // Mendapatkan nilai day, month, dan year
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; // Perlu ditambah 1 karena bulan dimulai dari 0
  //   const year = date.getFullYear();

  //   // Menambah "0" di depan jika nilai day atau month kurang dari 10
  //   const formattedDay = day < 10 ? '0' + day : day;
  //   const formattedMonth = month < 10 ? '0' + month : month;

  //   // Membuat string tanggal dengan format 'DD-MM-YYYY'
  //   const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  //   return formattedDate;
  // };

  const getStatusText = () => {
    switch (true) {
      case dataDetailAbsen.isAbsen === '1':
        return 'Absen';
      case dataDetailAbsen.isCuti === '1':
        return 'Cuti';
      case dataDetailAbsen.isLembur === '1':
        return 'Lembur';
      case dataDetailAbsen.isLibur === '1':
        return 'Libur';
      case dataDetailAbsen.isOther === '1':
        return 'Other';
      case dataDetailAbsen.isSakit === '1':
        return 'Sakit';
      case dataDetailAbsen.isWfh === '1':
        return 'WFH';
      default:
        return '-';
    }
  };

  return (
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
        <Text style={styles.Judul}>Detail Absen</Text>
      </View>
      <View style={styles.backgroundCardAbsen}>
        {isLoading ? (
          <SkeletonDetailAbsen />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.TextTitle}>Nik</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailAbsen.nik || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Nama</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailAbsen.nama || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Hari</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailAbsen.hari || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Tanggal</Text>
              <Text style={styles.TextDeskripsi}>
                {/* {formatDate(dataDetailAbsen.tglAbsen) || '-'} */}
                {dataDetailAbsen.tglAbsen || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Flag Keterangan</Text>
              <Text style={styles.TextDeskripsiFleg}>
                {getStatusText() || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Project</Text>
              <Text style={styles.TextDeskripsiProject}>
                {dataDetailAbsen.projectId?.namaProject || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Jam Masuk</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailAbsen.jamMsk
                  ? dataDetailAbsen.jamMsk.substring(0, 5)
                  : '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Catatan Telat</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailAbsen.noteTelatMsk || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Lokasi Masuk</Text>
              <Text style={{textAlign: 'justify', fontFamily: text.light}}>
                {dataDetailAbsen.lokasiMsk || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Jam Pulang</Text>
              <Text style={styles.TextDeskripsi}>
                {' '}
                {dataDetailAbsen.jamPlg
                  ? dataDetailAbsen.jamPlg.substring(0, 5)
                  : '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Catatan Pulang Cepat</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailAbsen.notePlgCepat || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Lokasi Pulang</Text>
              <Text
                style={{
                  textAlign: 'justify',
                  marginBottom: 25,
                  fontFamily: text.light,
                }}>
                {dataDetailAbsen.lokasiPlg || '-'}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default DetailAbsen;

const styles = StyleSheet.create({
  backgroundCardAbsen: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('11%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6.5%'),
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
  TextDeskripsiFleg: {
    fontFamily: text.light,
    marginVertical: 2,
    textTransform: 'uppercase',
  },
  TextDeskripsiProject: {
    fontFamily: text.light,
    marginVertical: 2,
    textTransform: 'uppercase',
  },
});
