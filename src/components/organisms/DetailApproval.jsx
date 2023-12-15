/* eslint-disable prettier/prettier */
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
import CustomTextInput from '../atoms/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {setFormApproval} from '../../redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import DetailSakitApp from '../molecules/DetailSakitApp';
import DetailLiburApp from '../molecules/DetailLiburApp';
import DetailLemburApp from '../molecules/DetailLemburApp';
import DetailAbsenPulangApp from '../molecules/DetailAbsenPulangApp';
import DetailReimburseApp from '../molecules/DetailReimburseApp';
import {API_GABUNGAN} from '@env';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {getDataFromSession} from '../../utils/getDataSession';
import DetailAbsen from './DetailAbsen';
import SkeletonDetailApproval from '../skeleton/SkeletonDetailApproval';

const DetailApproval = ({navigation, stylePP}) => {
  const {id, kategori} = useRoute().params;
  console.log(id + ' dan ' + kategori);
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [detailApp, setDetailApp] = useState([]);

  const getDataDetailMember = async (headers, type, idProject) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_GABUNGAN +
          `/api/notif/get-detail-approval?by=${type}&id=${idProject}`,
        {headers},
      );
      let dataAPI;
      switch (type) {
        case 'sakit':
          dataAPI = response.data.data.getSakitApproval;
          break;
        case 'cuti':
          dataAPI = response.data.data.getCutiApproval;
          break;
        case 'absen-pulang':
          dataAPI = response.data.data.getAbsenPulangApproval;
          break;
        case 'libur':
          dataAPI = response.data.data.getLiburApproval;
          break;
        case 'lembur':
          dataAPI = response.data.data.getLemburApproval;
          break;

        default:
          break;
      }
      console.log('detail asu : ', dataAPI);
      // const dataKosong = [];
      setDetailApp(dataAPI);
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
        getDataDetailMember(headers, kategori, id);
      })
      .catch(error => console.log(error));
  }, [id, kategori]);

  const onChangeText = (value, inputType) => {
    dispatch(setFormApproval(inputType, value));
  };
  const sendData = async isApprove => {
    // dispatch(setFormApproval('isApprove', isApprove));
    // if (form.isApprove === '' && form.catatanApproval) {
    //   console.log('heelo');
    // }
    console.log('kirim data : ', form);
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
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>Approval</Text>
      </View>
      {kategori === 'sakit' ||
      kategori === 'cuti' ||
      kategori === 'cuti-web' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailSakitApp
            kategoriCuti={kategori}
            nik={detailApp.nik || '-'}
            alamat={detailApp.alamatCuti || '-'}
            jenisCuti={detailApp.jenisCuti || '-'}
            jmlCuti={detailApp.jmlCuti || '-'}
            jmlCutiBersama={detailApp.jmlCutiBersama || '-'}
            jmlCutiKhusus={detailApp.jmlCutiKhusus || '-'}
            keterangan={detailApp.keperluanCuti || '-'}
            nama={detailApp.nama || '-'}
            approve={() => sendData('1')}
            reject={() => sendData('1')}
            tglMasuk={detailApp.tglKembaliKerja || '-'}
            tglMulai={detailApp.tglMulai || '-'}
            tglSelesai={detailApp.tglSelesai || '-'}
            namaProject={detailApp.projectId.namaProject || '-'}
          />
        )
      ) : (
        ''
      )}
      {kategori === 'absen-pulang' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailAbsenPulangApp
            kategoriCuti={kategori}
            nik={detailApp.nik || '-'}
            nama={detailApp.nama || '-'}
            hari={detailApp.hari || '-'}
            jamMasuk={detailApp.jamMsk || '-'}
            jamPulang={detailApp.jamPlg || '-'}
            lokasiMasuk={detailApp.lokasiMsk || '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            noteOther={detailApp.noteOther || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            tanggalAbsen={detailApp.tglAbsen || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId.namaProject || '-'}
            approve={() => sendData('1')}
            reject={() => sendData('1')}
          />
        )
      ) : (
        ''
      )}
      {kategori === 'libur' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailLiburApp
            kategoriCuti={kategori}
            nik={detailApp.nik || '-'}
            nama={detailApp.nama || '-'}
            tanggalAbsen={detailApp.tglAbsen || '-'}
            jamMasuk={detailApp.jamMsk || '-'}
            lokasiMasuk={detailApp.lokasiMsk || '-'}
            jamPulang={detailApp.jamPlg || '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            noteOther={detailApp.noteOther || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId.namaProject || '-'}
            approve={() => sendData('1')}
            reject={() => sendData('1')}
          />
        )
      ) : (
        ''
      )}
      {kategori === 'lembur' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailLemburApp
            kategoriCuti={kategori}
            nik={detailApp.nik || '-'}
            nama={detailApp.nama || '-'}
            hari={detailApp.hari || '-'}
            jamMasuk={detailApp.jamMsk || '-'}
            jamPulang={detailApp.jamPlg || '-'}
            lokasiMasuk={detailApp.lokasiMsk || '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            noteOther={detailApp.noteOther || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            tanggalAbsen={detailApp.tglAbsen || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            keterangan={detailApp.keterangan || '-'}
            namaProject={detailApp.projectId.namaProject || '-'}
            approve={() => sendData('1')}
            reject={() => sendData('1')}
          />
        )
      ) : (
        ''
      )}
      {/* 
      {kategori === 'absen-pulang'
        ? detailApp.map((item, index) => <DetailAbsenPulangApp />)
        : ''}
      {kategori === 'libur'
        ? detailApp.map((item, index) => <DetailLiburApp />)
        : ''}
      {kategori === 'lembur'
        ? detailApp.map((item, index) => <DetailLemburApp />)
        : ''}
      {kategori === 'reimburse' || kategori === 'absen-web'
        ? detailApp.map((item, index) => <DetailReimburseApp />)
        : ''} */}
    </View>
  );
};

export default DetailApproval;

const styles = StyleSheet.create({
  backgroundDetailApproval: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
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
  ButtonReject: {
    backgroundColor: 'transparent',
    borderColor: Color.red,
    borderWidth: 2,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonApprove: {
    backgroundColor: Color.green,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.red,
  },
  pp: {
    borderRadius: 200,
  },
});
