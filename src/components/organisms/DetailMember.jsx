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
import {API_URL, API_GABUNGAN} from '@env';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import { useRoute } from '@react-navigation/native';
import SkeletonDetailMember from '../skeleton/SkeletonDetailMember';

const DetailMember = ({navigation, stylePP}) => {
  const {idMember} = useRoute().params;
  console.log('id : ', idMember);
  const [isLoading, setIsLoading] = useState(true);
  const [isWFH, setIsWFH] = useState(true);
  const [dataDetailMember, setDataDetailMember] = useState([]);

    const getDataBelumAbsen = async headers => {
      try {
        const response = await axios.get(
          API_GABUNGAN + `/api/member/get-data-absen?idAbsen=${idMember}`,
          {headers},
        );
        console.log(response.data.data);
        const dataAPI = response.data.data;
        // const dataKosong = [];
        setDataDetailMember(dataAPI.absenEntity);
        setIsLoading(false);
        console.log('data : ', dataAPI.absenEntity);
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
          getDataBelumAbsen(headers);
        })
        .catch(error => console.log(error));
    }, []);


  return (
      isLoading ? (
        <SkeletonDetailMember/>
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
            <TouchableOpacity>
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
            <Text style={styles.TextDeskripsi}>{dataDetailMember.nik}</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nama</Text>
            <Text style={styles.TextDeskripsi}>{dataDetailMember.nama}</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Project</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.projectId.namaProject}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.jamMsk === null
                ? 'Belum Absen Masuk'
                : dataDetailMember.jamMsk}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Masuk</Text>
            <Text style={{textAlign: 'justify'}}>
              {dataDetailMember.lokasiMsk}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Telat</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.noteTelatMsk}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Keluar</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.jamPlg === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.jamPlg}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Lokasi Keluar</Text>
            <Text style={{textAlign: 'justify'}}>
              {dataDetailMember.lokasiPlg === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.lokasiPlg}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Pulang Cepat</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.notePlgCepat === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.notePlgCepat}
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Timesheet</Text>
            <Text style={styles.TextDeskripsi}>
              {dataDetailMember.notePekerjaan === null
                ? 'Belum Absen Keluar'
                : dataDetailMember.notePekerjaan}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
      )
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
