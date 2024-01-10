/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardRekapSakit from '../molecules/CardRekapSakit';
import ButtonBack from '../atoms/ButtonBack';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasBesar from '../atoms/VectorAtasBesar';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import LottieView from 'lottie-react-native';
import SkeletonCardRekapSakit from '../skeleton/SkeletonCardRekapSakit';

const ListRekapSakit = ({navigation}) => {
  const [ketSakit, setKetSakit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const getDataSakit = async headers => {
  //   try {
  //     const response = await axios.get(
  //       API_GABUNGAN + '/api/rekap/get-rekap-sakit',
  //       {
  //         headers,
  //       },
  //     );
  //     console.log(response.data.data);
  //     const dataAPI = response.data.data;

  //     console.log('data sakit : ', dataAPI);
  //     setKetSakit(dataAPI);

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log('Tidak dapat mengambil data ', error.response);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getDataFromSession('token')
  //     .then(token => {
  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //       };
  //       getDataSakit(headers);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  const getDataSakit = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-rekap-sakit',
        {
          headers,
        },
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      // const dataSakit = dataAPI.filter(item => item.flgKet === 'sakit');

      console.log('data sakit : ', dataAPI);
      setKetSakit(dataAPI);

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
        getDataSakit(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const moveToPreview = async id => {
    console.log('ini id', id);
    navigation.navigate('previewPhotoAPI', {
      path: `/api/rekap/get-detail-sakit?id=${id}`,
    });
  };

  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <View style={styles.wrapKeteranganSakit}>
        <VectorAtasBesar />
        <Text style={styles.judul}>KETERANGAN SAKIT</Text>
      </View>
      <View style={styles.wrapCardRekapSakit}>
        {isLoading ? (
          <View style={{flex: 1}}>
            <SkeletonCardRekapSakit />
            <SkeletonCardRekapSakit />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {ketSakit.length > 0 ? (
              ketSakit.map((sakit, index) => {
                const isApprove = sakit.isApproved;
                let status;
                switch (isApprove) {
                  case null:
                    status = 'Menunggu';
                    break;
                  case '1':
                    status = 'Disetujui';
                    break;
                  case '0':
                    status = 'Ditolak';
                    break;
                  default:
                    status = 'Menunggu';
                    break;
                }
                return (
                  <View key={index}>
                    <CardRekapSakit
                      navigation={navigation}
                      tanggalAwal={sakit.tglMulai || '-'}
                      tanggalAkhir={sakit.tglSelesai || '-'}
                      tanggalKerja={sakit.tglKembaliKerja || '-'}
                      jumHari={sakit.jmlCuti || '-'}
                      keterangan={sakit.keperluanCuti || '-'}
                      disetujuiOleh={sakit.usrApp || '-'}
                      catatanDisetujui={sakit.noteApp || '-'}
                      image64={sakit.gambarnya}
                      status={status}
                      onPress={() => moveToPreview(sakit.id)}
                    />
                  </View>
                );
              })
            ) : (
              // Handle the case when rekCuti is not an array
              <View style={styles.wrapDataNotFound}>
                <LottieView
                  source={require('../../assets/animation/dataNotFound.json')}
                  autoPlay
                  style={{
                    width: '100%',
                    height: '70%',
                  }}></LottieView>
                <Text style={styles.textDataNotFound}>
                  Tidak Ada Data Rekap Sakit
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ListRekapSakit;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapKeteranganSakit: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardRekapSakit: {
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
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
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
