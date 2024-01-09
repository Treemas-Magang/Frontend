// /* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import ButtonAction from '../atoms/ButtonAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import SkeletonDetailTimesheet from '../skeleton/SkeletonDetailTimesheet';

const DetailTimesheet = ({navigation}) => {
  const {id} = useRoute().params;
  const [dataDetailTimesheet, setDataDetailTimesheet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDataDetailTimesheet = async (headers, id_user) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_GABUNGAN + `/api/rekap/get-detail-timesheet?id=${id_user}`,
        {headers},
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      // const dataKosong = [];
      setDataDetailTimesheet(dataAPI);
      console.log('ini data detail timesheet', dataAPI);
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

  const moveTo = (tujuan, tgl) => {
    navigation.navigate(tujuan, {tgl: tgl, id: id});
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.containerJudul}>
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>Timesheet</Text>
      </View>
      <View style={styles.content}>
        {isLoading ? (
          <SkeletonDetailTimesheet />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Hari
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.hari || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Tanggal
              </Text>
              <Text style={{fontFamily: text.light}}>
                {/* {formatDate(dataDetailTimesheet.tglMsk) || '-'} */}
                {dataDetailTimesheet.tglMsk || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Project
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.projectId?.namaProject || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Lokasi
              </Text>
              <Text style={{textAlign: 'justify', fontFamily: text.light}}>
                {dataDetailTimesheet.projectId?.lokasi || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Keterangan
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.note || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Jam Masuk
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.jamMasuk
                  ? dataDetailTimesheet.jamMasuk.substring(0, 5)
                  : '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Jam Keluar
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.jamKeluar
                  ? dataDetailTimesheet.jamKeluar.substring(0, 5)
                  : '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Total Jam Kerja
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.projectId?.jamKerja || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Total Jam Lembur
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.overtime || '-'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
                Total Jam Kerja
              </Text>
              <Text style={{fontFamily: text.light}}>
                {dataDetailTimesheet.totalJamKerja || '-'}
              </Text>
            </View>
          </ScrollView>
        )}
        <View style={{alignItems: 'center'}}>
          <View style={styles.buttonUpdate}>
            <ButtonAction
              onPress={() =>
                moveTo('formUpdateTimesheet', dataDetailTimesheet.tglMsk)
              }
              title="UPDATE"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailTimesheet;

const styles = StyleSheet.create({
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  buttonUpdate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp('80%'),
    minHeight: hp('10%'),
    justifyContent: 'space-evenly',
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
    fontSize: 10,
  },
  content: {
    // backgroundColor: Color.white,
    // flex: 5,
    // position: 'relative',
    // alignItems: 'center',
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    // paddingTop: 35,
    // paddingHorizontal: 15,

    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('80%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('1%'),
  },
  containerJudul: {
    flex: 1,
    justifyContent: 'center',
  },
});
