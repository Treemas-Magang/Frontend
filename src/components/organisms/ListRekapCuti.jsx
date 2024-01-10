/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import ButtonBack from '../atoms/ButtonBack';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardRekapCuti from '../molecules/CardRekapCuti';
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
import SkeeltonCardRekapCuti from '../skeleton/SkeletonCardRekapCuti';

const ListRekapCuti = ({navigation}) => {
  const [rekCuti, setRekCuti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDataCuti = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-rekap-cuti',
        {
          headers,
        },
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;
      const dataCuti = dataAPI.filter(item => item.flgKet === 'cuti');

      console.log('data cuti : ', dataCuti);
      setRekCuti(dataCuti);

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
        getDataCuti(headers);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <View style={styles.wrapKeteranganCuti}>
        <View
          style={{
            width: wp('100%'),
            height: hp('30%'),
            justifyContent: 'center',
          }}>
          <Text style={styles.Judul}>Keterangan Cuti</Text>
        </View>
      </View>
      <View style={styles.wrapCardRekapCuti}>
        {isLoading ? (
          <View style={{flex: 1}}>
            <SkeeltonCardRekapCuti />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {rekCuti.length > 0 ? (
              rekCuti.map((cuti, index) => {
                const isApprove = cuti.isApproved;
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
                    <CardRekapCuti
                      nmTempat={cuti.alamatCuti || '-'}
                      tanggalAwal={cuti.tglMulai || '-'}
                      tanggalAkhir={cuti.tglSelesai || '-'}
                      tanggalMasuk={cuti.tglKembaliKerja || '-'}
                      jmlhHari={cuti.jmlCuti || '-'}
                      jmlhCutiBersama={cuti.jmlCutiBersama || '-'}
                      jmlhCutiKhusus={cuti.jmlCutiKhusus || '-'}
                      keterangan={cuti.keperluanCuti || '-'}
                      catDisetujui={cuti.noteApp || '-'}
                      tglDisetujui={cuti.dtmApp !== null ? cuti.dtmApp.split('T')[0] : '-'}
                      disetujuiOleh={cuti.usrApp || '-'}
                      status={status}
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
                  Tidak Ada Data Rekap Cuti
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ListRekapCuti;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapKeteranganCuti: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardRekapCuti: {
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
  Judul: {
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
