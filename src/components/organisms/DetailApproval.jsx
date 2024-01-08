/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
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
import SkeletonDetailApproval from '../skeleton/SkeletonDetailApproval';
import DetailAbsenWebApp from '../molecules/DetailAbsenWebApp';
import DetailCutiWebApp from '../molecules/DetailCutiWebApp';

const DetailApproval = ({navigation, stylePP}) => {
  const {id, kategori} = useRoute().params;
  let kategoriBaru = kategori.replace(/-/g, ' ');
  console.log(id + ' dan ' + kategori);
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [detailApp, setDetailApp] = useState([]);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [inputKosong, setInputKosong] = useState(false);

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
        case 'reimburse':
          dataAPI = response.data.data.getDetailReimburseApproval;
          break;
        case 'absen-web':
          dataAPI = response.data.data.getDetailAbsenWebApproval;
          break;
        case 'cuti-web':
          dataAPI = response.data.data.getDetailCutiWebApproval;
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

  const uploadData = async (data, type, id_app) => {
    setBtnLoading(true);
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.post(
          `${API_GABUNGAN}/api/notif/post-approval?by=${type}&id=${id_app}`,
          data,
          {headers},
        );
        console.log('response upload : ', response);
        console.log('berhasil approve');
        console.log(uploadBerhasil);
        setUploadBerhasil(true);
        setIsLoading(false);
        setBtnLoading(false);
      } catch (error) {
        console.log(error.response);
        const errorCode = error.response ? error.response.code : null;
        switch (errorCode) {
          case 403:
            console.log('project tidak tepat');
            setIsLoading(false);
            break;
          case 404:
            setIsLoading(false);
            break;
          case 500:
            setIsLoading(false);
            setBtnLoading(false);
            setServerError(true);
            console.log('Kesalahan server');
            break;
          default:
            setIsLoading(false);
            console.log('gagal absen');
            break;
        }
      }
    }
  };

  const sendDataReject = async isApprove => {
    if (form.noteApp !== '') {
      dispatch(setFormApproval('isApprove', isApprove));
      if (form.isApprove !== '') {
        await uploadData(form, kategori, id);
        console.log('kirim data : ', form);
      } else {
        console.log('is approve kosong');
      }
      return;
    } else {
      console.log('ketrangan kosong');
    }
  };

  const sendDataApprove = async isApprove => {
    if (form.noteApp !== '') {
      dispatch(setFormApproval('isApprove', isApprove));
      if (form.isApprove !== '') {
        await uploadData(form, kategori, id);
        console.log('kirim data : ', form);
      } else {
        console.log('is approve kosong');
      }
      return;
    } else {
      console.log('ketrangan kosong');
    }
  };

  const moveToPreview = async id => {
    // console.log('ini id', id);
    navigation.navigate('previewPhotoAPI', {
      // path: `/api/rekap/get-detail-claim?id=${id}`,
    });
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
        <Text style={styles.Judul}>Approval {kategoriBaru}</Text>
        {/* <Text style={styles.Judul}>Approval {kategoriBaru}</Text> */}
      </View>
      {kategori === 'sakit' || kategori === 'cuti' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailSakitApp
            kategoriCuti={kategori}
            nik={detailApp.nik || '-'}
            alamat={detailApp.alamatCuti || '-'}
            jenisCuti={
              kategori === 'sakit' ? '-' : detailApp.jenisCuti.cutiDesc || '-'
            }
            jmlCuti={detailApp.jmlCuti || '-'}
            jmlCutiBersama={detailApp.jmlCutiBersama || '-'}
            jmlCutiKhusus={detailApp.jmlCutiKhusus || '-'}
            keterangan={detailApp.keperluanCuti || '-'}
            nama={detailApp.nama || '-'}
            tglMasuk={detailApp.tglKembaliKerja || '-'}
            tglMulai={detailApp.tglMulai || '-'}
            tglSelesai={detailApp.tglSelesai || '-'}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
            namaProject={detailApp.projectId?.namaProject || '-'}
            image64={kategori === 'sakit' ? detailApp.gambarnya : null}
            onPress={() => moveToPreview(detailApp.id)}
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
            namaProject={detailApp.projectId?.namaProject}
            isApprove1={detailApp.isApprove1}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
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
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
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
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
          />
        )
      ) : (
        ''
      )}
      {kategori === 'reimburse' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailReimburseApp
            nik={detailApp.nik || '-'}
            nama={detailApp.nama || '-'}
            hari={detailApp.hari || '-'}
            tanggalAbsen={detailApp.tglAbsen || '-'}
            lokasiMasuk={detailApp.lokasiMsk || '-'}
            jamMasuk={detailApp.jamMsk || '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            jamPulang={detailApp.jamPlg || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteOther={detailApp.noteOther || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
          />
        )
      ) : (
        ''
      )}
      {kategori === 'absen-web' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailAbsenWebApp
            nik={detailApp.nik || '-'}
            nama={detailApp.nama || '-'}
            hari={detailApp.hari || '-'}
            tanggalAbsen={detailApp.tglAbsen || '-'}
            lokasiMasuk={detailApp.lokasiMsk || '-'}
            jamMasuk={detailApp.jamMsk || '-'}
            jarakMsk={detailApp.jarakMsk || '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            jamPulang={detailApp.jamPlg || '-'}
            jarakPlg={detailApp.jarakPlg || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteOther={detailApp.noteOther || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
          />
        )
      ) : (
        ''
      )}
      {kategori === 'cuti-web' ? (
        isLoading ? (
          <SkeletonDetailApproval />
        ) : (
          <DetailCutiWebApp
            nik={detailApp.nik || '-'}
            nama={detailApp.nama || '-'}
            tglMulai={detailApp.tglMulai || '-'}
            tglSelesai={detailApp.tglSelesai || '-'}
            tglKembaliKerja={detailApp.tglKembaliKerja || '-'}
            alamatCuti={detailApp.alamatCuti || '-'}
            keperluanCuti={detailApp.keperluanCuti || '-'}
            approve={() => sendDataApprove('1')}
            reject={() => sendDataReject('0')}
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
