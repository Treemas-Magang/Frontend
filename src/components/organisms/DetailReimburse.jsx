import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
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
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import SkeletonDetailReimburse from '../skeleton/SkeletonDetailReimburse';

const DetailReimburse = ({navigation}) => {
  const {id} = useRoute().params;
  console.log('ini id', id);
  const [dataDetailReimburse, setDataDetailReimburse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDataDetailTimesheet = async (headers, id_user) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_GABUNGAN + `/api/rekap/get-detail-reimburse?id=${id_user}`,
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      // const dataKosong = [];
      setDataDetailReimburse(dataAPI);
      console.log('ini data detail reimburse', dataAPI);
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
        getDataDetailTimesheet(headers, id);
      })
      .catch(error => console.log(error));
  }, [id]);

  const formatDate = dateString => {
    // Mengasumsikan dateString dalam format 'YYYY/MM/DD'
    const date = new Date(dateString);
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    // Menggunakan toLocaleDateString untuk mendapatkan format tanggal yang diinginkan
    const formattedDate = date.toLocaleDateString('id-ID', options);

    // Mengganti karakter "/" dengan "-"
    return formattedDate.replace(/\//g, '-');
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
        <Text style={styles.Judul}>Detail Reimburse</Text>
      </View>
      <View style={styles.backgroundCardReimburse}>
        {isLoading ? (
          // <SkeletonDetailReimburse />
          <Text>Loading...</Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.TextTitle}>Hari</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailReimburse.hari || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Tanggal</Text>
              <Text style={styles.TextDeskripsi}>
                {formatDate(dataDetailReimburse.tanggal) || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Flag Keterangan</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailReimburse.flgKet || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Project</Text>
              <Text style={styles.TextDeskripsi}>PT TREEMAS SOLUSI UTAMA</Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Lokasi</Text>
              <Text style={{textAlign: 'justify', fontFamily: text.light}}>
                jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya,
                Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326,
                Indonesia
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Jam Masuk</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailReimburse.jamMasuk.substring(0, 5) || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Jam Keluar</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailReimburse.jamKeluar.substring(0, 5) || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Transport</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailReimburse.transport || '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Uang Makan</Text>
              <Text style={styles.TextDeskripsi}>
                {dataDetailReimburse.uangMakan || '-'}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default DetailReimburse;

const styles = StyleSheet.create({
  backgroundCardReimburse: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),

    // backgroundColor: Color.white,
    // paddingTop: 50,
    // paddingHorizontal: 29,
    // flex: 1,
    // borderTopEndRadius: 35,
    // borderTopStartRadius: 35,
    // marginTop: -50,
    // height: hp('85%'),
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
    fontSize: hp('2%'),
  },
  TextDeskripsi: {
    fontFamily: text.light,
    fontSize: hp('2%'),
    marginVertical: 2,
  },
});
