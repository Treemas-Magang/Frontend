/* eslint-disable prettier/prettier */
import {Alert, StyleSheet, Text, View} from 'react-native';
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
import {
  AlertNotificationDanger,
  AlertNotificationSuccess,
} from '../atoms/AlertNotification';

const DetailApproval = ({navigation, stylePP}) => {
  const {id, kategori} = useRoute().params;
  console.log('di detail app : ', kategori);
  let kategoriBaru = kategori?.replace(/-/g, ' ');
  console.log(id + ' dan ' + kategori);
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [detailApp, setDetailApp] = useState([]);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [uploadGagal, setUploadGagal] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [inputKosong, setInputKosong] = useState(false);
  const [isRole, setIsRole] = useState('');
  console.log('role : ', isRole);

  useEffect(() => {
    getDataFromSession('dataProfilUser')
      .then(data => {
        const dataProfile = JSON.parse(data);
        console.log('role haha : ', dataProfile);
        setIsRole(dataProfile.role);
      })
      .catch(error => console.log(error));
  }, []);

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
      console.log('detail detail : ', dataAPI);
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

  const uploadData = async (data, type, id_app, role, approve) => {
    const dataForm = await data;
    console.log('role dala, upload : ', role);
    console.log('data upload : ', dataForm);
    setBtnLoading(true);
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // if (role === "HEAD") {
      //   console.log('aku head')
      //   console.log(data.noteApp2)
      // } else {
      //   console.log('aku lead')
      //   console.log(data.noteApp1);
      //   console.log(data.isApprove1);
      // }
      try {
        if (
          type === 'libur' ||
          type === 'lembur' ||
          type === 'absen-web' ||
          type === 'absen-pulang'
        ) {
          if (role === 'HEAD') {
            const response = await axios.post(
              `${API_GABUNGAN}/api/notif/post-approval?by=${type}&id=${id_app}`,
              {
                isApprove2: approve,
                noteApp2: data.noteApp2,
                isApprove1: '',
                noteApp1: '',
              },
              {headers},
            );
            console.log('response upload : ', response);
            dispatch(setFormApproval('isApprove2', ''));
            dispatch(setFormApproval('noteApp2', ''));
            console.log('berhasil approve2');
            console.log(uploadBerhasil);
            setUploadBerhasil(true);
            setIsLoading(false);
            setBtnLoading(false);
          } else {
            const response = await axios.post(
              `${API_GABUNGAN}/api/notif/post-approval?by=${type}&id=${id_app}`,
              {
                isApprove1: approve,
                noteApp1: data.noteApp1,
                isApprove2: '',
                noteApp2: '',
              },
              {headers},
            );
            console.log('response upload : ', response);
            dispatch(setFormApproval('isApprove1', ''));
            dispatch(setFormApproval('noteApp1', ''));
            console.log('berhasil approve 1');
            console.log(uploadBerhasil);
            setUploadBerhasil(true);
            setIsLoading(false);
            setBtnLoading(false);
          }
        } else {
          const response = await axios.post(
            `${API_GABUNGAN}/api/notif/post-approval?by=${type}&id=${id_app}`,
            {
              isApprove: approve,
              noteApp: data.noteApp,
            },
            {headers},
          );
          console.log('response upload : ', response);
          dispatch(setFormApproval('isApprove', ''));
          dispatch(setFormApproval('noteApp', ''));
          console.log('berhasil approve');
          console.log(uploadBerhasil);
          setUploadBerhasil(true);
          setIsLoading(false);
          setBtnLoading(false);
        }
      } catch (error) {
        console.log(error.response);
        const errorCode = error.response ? error.response.code : null;
        switch (errorCode) {
          case 403:
            console.log('project tidak tepat');
            setIsLoading(false);
            break;
          case 400:
            console.log('project tidak tepat');
            setIsLoading(false);
            setUploadGagal(true);
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

  const alertApprove = () => {
    dispatch(setFormApproval('isApprove2', '1'));
    dispatch(setFormApproval('isApprove1', '1'));
    dispatch(setFormApproval('isApprove', '1'));
    Alert.alert(
      'Approve',
      'Apa anda mau melakukan approve?',
      [
        {
          text: 'OK',
          onPress: async () => {
            await sendDataApprove('1');
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            dispatch(setFormApproval('isApprove2', ''));
            dispatch(setFormApproval('isApprove1', ''));
            dispatch(setFormApproval('isApprove', ''));
            dispatch(setFormApproval('noteApp', ''));
            dispatch(setFormApproval('noteApp1', ''));
            dispatch(setFormApproval('noteApp2', ''));
          },
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const alertReject = () => {
    dispatch(setFormApproval('isApprove2', '0'));
    dispatch(setFormApproval('isApprove1', '0'));
    dispatch(setFormApproval('isApprove', '0'));
    Alert.alert(
      'Reject',
      'Apa anda mau melakukan Reject?',
      [
        {
          text: 'OK',
          onPress: async () => {
            await sendDataReject('0');
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            dispatch(setFormApproval('isApprove2', ''));
            dispatch(setFormApproval('isApprove1', ''));
            dispatch(setFormApproval('isApprove', ''));
            dispatch(setFormApproval('noteApp', ''));
            dispatch(setFormApproval('noteApp1', ''));
            dispatch(setFormApproval('noteApp2', ''));
          },
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const sendDataApprove = async approve => {
    if (form.noteApp1 !== '' || form.noteApp2 !== '' || form.noteApp !== '') {
      if (
        kategori === 'libur' ||
        kategori === 'lembur' ||
        kategori === 'absen-web' ||
        kategori === 'absen-pulang'
      ) {
        if (isRole === 'HEAD') {
          // dispatch(setFormApproval('isApprove2', '1'));
          if (approve !== '') {
            await uploadData(form, kategori, id, isRole, approve);
            console.log('kirim data : ', ', noteApp2 : ', form.noteApp2);
          } else {
            console.log('is approve kosong');
          }
        } else {
          // dispatch(setFormApproval('isApprove1', '1'));
          if (approve !== '') {
            await uploadData(form, kategori, id, isRole, approve);
            console.log('kirim data : ', ', noteApp1 : ', form.noteApp1);
          } else {
            console.log('is approve kosong');
          }
          return;
        }
      } else {
        // dispatch(setFormApproval('isApprove', '1'));
        if (approve !== '') {
          await uploadData(form, kategori, id, isRole, approve);
          console.log(
            'kirim data : ',
            '"isApprove : "',
            form.isApprove,
            ', noteApp : ',
            form.noteApp,
          );
        } else {
          console.log('is approve kosong');
        }
        return;
      }
    } else {
      console.log('ketrangan kosong');
    }
  };

  const sendDataReject = async approve => {
    if (form.noteApp1 !== '' || form.noteApp2 !== '' || form.noteApp !== '') {
      if (
        kategori === 'libur' ||
        kategori === 'lembur' ||
        kategori === 'absen-web' ||
        kategori === 'absen-pulang'
      ) {
        if (isRole === 'HEAD') {
          dispatch(setFormApproval('isApprove2', '0'));
          if (approve !== '') {
            await uploadData(form, kategori, id, isRole, approve);
            console.log('kirim data : ', ', noteApp2 : ', form.noteApp2);
          } else {
            console.log('is approve kosong');
          }
        } else {
          dispatch(setFormApproval('isApprove1', '0'));
          if (approve !== '') {
            await uploadData(form, kategori, id, isRole, approve);
            console.log('kirim data : ', 'noteApp1 : ', form.noteApp1);
          } else {
            console.log('is approve kosong');
          }
        }
      } else {
        dispatch(setFormApproval('isApprove', '0'));
        if (approve !== '') {
          await uploadData(form, kategori, id, isRole, approve);
          console.log('kirim data : ', 'noteApp : ', form.noteApp);
        } else {
          console.log('is approve kosong');
        }
        return;
      }
    } else {
      console.log('ketrangan kosong');
    }
  };

  const moveToPreview = async image => {
    // console.log('ini id', id);
    navigation.navigate('previewPhoto', {
      photo: `data:image/jpeg;base64,${image}`,
    });
  };

    const toDashboard = () => {
      // navigation.replace('dashboard');
      navigation.navigate('dashboard');
    };
    const close = () => {
      setUploadGagal(false);
    };

  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      {uploadBerhasil ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Berhasil Melakukan Approve/Reject"
            titleAlert="Success"
            onPress={toDashboard}
          />
        </View>
      ) : (
        ''
      )}
      {uploadGagal ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationDanger
            buttonAlert="Close"
            textBodyAlert="Gagal Melakukan Approve/Reject Coba Sekali lagi"
            titleAlert="Failed"
            onPress={close}
          />
        </View>
      ) : (
        ''
      )}
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
            nik={
              kategori === 'sakit'
                ? detailApp.sakitApproval.nik || '-'
                : detailApp.nik || '-'
            }
            alamat={
              kategori === 'sakit'
                ? detailApp.sakitApproval.alamatCuti || '-'
                : detailApp.alamatCuti || '-'
            }
            jenisCuti={
              kategori === 'sakit' ? '-' : detailApp.jenisCuti.cutiDesc || '-'
            }
            jmlCuti={
              kategori === 'sakit'
                ? detailApp.sakitApproval.jmlCuti || '-'
                : detailApp.jmlCuti || '-'
            }
            jmlCutiBersama={
              kategori === 'sakit'
                ? detailApp.sakitApproval.jmlCutiBersama || '-'
                : detailApp.jmlCutiBersama || '-'
            }
            jmlCutiKhusus={
              kategori === 'sakit'
                ? detailApp.sakitApproval.jmlCutiKhusus || '-'
                : detailApp.jmlCutiKhusus || '-'
            }
            keterangan={
              kategori === 'sakit'
                ? detailApp.sakitApproval.keperluanCuti || '-'
                : detailApp.keperluanCuti || '-'
            }
            nama={
              kategori === 'sakit'
                ? detailApp.sakitApproval.nama || '-'
                : detailApp.nama || '-'
            }
            tglMasuk={
              kategori === 'sakit'
                ? detailApp.sakitApproval.tglKembaliKerja || '-'
                : detailApp.tglKembaliKerja || '-'
            }
            tglMulai={
              kategori === 'sakit'
                ? detailApp.sakitApproval.tglMulai || '-'
                : detailApp.tglMulai || '-'
            }
            tglSelesai={
              kategori === 'sakit'
                ? detailApp.sakitApproval.tglSelesai || '-'
                : detailApp.tglSelesai || '-'
            }
            approve={() => alertApprove()}
            reject={() => alertReject()}
            image64={
              kategori === 'sakit' && detailApp.image64 !== '' ? true : false
            }
            onPress={() => moveToPreview(detailApp.image64)}
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
            jamMasuk={detailApp.jamMsk ? detailApp.jamMsk.substring(0, 5) : '-'}
            jamPulang={
              detailApp.jamPlg ? detailApp.jamPlg.substring(0, 5) : '-'
            }
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
            approve={() => alertApprove()}
            reject={() => alertReject()}
            isRole={isRole}
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
            jamMasuk={detailApp.jamMsk ? detailApp.jamMsk.substring(0, 5) : '-'}
            lokasiMasuk={detailApp.lokasiMsk || '-'}
            jamPulang={
              detailApp.jamPlg ? detailApp.jamPlg.substring(0, 5) : '-'
            }
            lokasiPulang={detailApp.lokasiPlg || '-'}
            noteOther={detailApp.noteOther || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => alertApprove()}
            reject={() => alertReject()}
            isApprove1={detailApp.isApprove1}
            isRole={isRole}
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
            jamMasuk={detailApp.jamMsk ? detailApp.jamMsk.substring(0, 5) : '-'}
            jamPulang={
              detailApp.jamPlg ? detailApp.jamPlg.substring(0, 5) : '-'
            }
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
            approve={() => alertApprove()}
            reject={() => alertReject()}
            isRole={isRole}
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
            jamMasuk={detailApp.jamMsk ? detailApp.jamMsk.substring(0, 5) : '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            jamPulang={
              detailApp.jamPlg ? detailApp.jamPlg.substring(0, 5) : '-'
            }
            notePekerjaan={detailApp.notePekerjaan || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteOther={detailApp.noteOther || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => alertApprove()}
            reject={() => alertReject()}
            isApprove1={detailApp.isApprove1}
            isRole={isRole}
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
            jamMasuk={detailApp.jamMsk ? detailApp.jamMsk.substring(0, 5) : '-'}
            jarakMsk={detailApp.jarakMsk || '-'}
            lokasiPulang={detailApp.lokasiPlg || '-'}
            jamPulang={
              detailApp.jamPlg ? detailApp.jamPlg.substring(0, 5) : '-'
            }
            jarakPlg={detailApp.jarakPlg || '-'}
            notePekerjaan={detailApp.notePekerjaan || '-'}
            noteTelatMasuk={detailApp.noteTelatMsk || '-'}
            notePulangCepat={detailApp.notePlgCepat || '-'}
            noteOther={detailApp.noteOther || '-'}
            totalJamKerja={detailApp.totalJamKerja || '-'}
            namaProject={detailApp.projectId?.namaProject || '-'}
            approve={() => alertApprove()}
            reject={() => alertReject()}
            isApprove1={detailApp.isApprove1}
            isRole={isRole}
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
            approve={() => alertApprove()}
            reject={() => alertReject()}
          />
        )
      ) : (
        ''
      )}
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
