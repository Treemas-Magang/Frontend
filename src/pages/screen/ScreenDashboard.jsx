/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {Color} from '../../utils/color';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import MenuUtama from '../../components/organisms/MenuUtama';
import DataPribadi from '../../components/molecules/DataPribadi';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {cekToken} from '../../utils/cekToken';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_GABUNGAN} from '@env';
import {
  countDataWithFalseStatus,
  getToken,
} from '../../utils/buatStatusPengumumanFalse';
import {setJumlahApproval, setJumlahPengumuman} from '../../redux';
import setDataJmlNotifMasingMasingApproval from '../../utils/simpanJmlSetiapTipeApp';
import {
  pushNewAnnouncementNotification,
  pushNewApprovalNotification,
} from '../../utils/pushNotifikasi';
import { kirimLokasiTracking } from '../../utils/kirimLokasiTracking';
import HapusChace from '../../components/atoms/HapusCache';
const ScreenDashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const {pengumuman} = useSelector(state => state.JumlahPengumumanReducer);

  const {approval} = useSelector(state => state.JumlahApprovalReducer);
  const [jmlBlmBaca, setJmlBlmBaca] = useState(0);
  const [isRole, setIsRole] = useState('');
  console.log('isRole : ', isRole);
  useEffect(() => {
    getDataFromSession('dataProfilUser')
      .then(data => {
        const dataProfile = JSON.parse(data);
        // console.log('data profil menu utama : ', dataProfile);
        setIsRole(dataProfile.role);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    cekToken();
  }, []);

  useEffect(() => {
    let totalNotif;
    if (isRole !== 'EMPL') {
      totalNotif = pengumuman + approval;
    } else {
      totalNotif = pengumuman;
    }
    setJmlBlmBaca(totalNotif);
  }, [approval, pengumuman, isRole]);

  const getDataIsAbsen = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/absen/get-is-absen',
        {
          headers,
        },
      );
      const dataAPI = response.data.data[0];
      console.log('Ini data API Absen:', dataAPI);

      // Setelah mendapatkan data dari API, langsung set nilai 'sudah_absen'
      // berdasarkan panjang dataAPI (jika lebih dari 0, maka sudah absen)
      await AsyncStorage.setItem(
        'sudah_absen',
        dataAPI.jamMsk !== null ? 'true' : 'false',
      );

      // Setelah itu, periksa apakah dataAPI[0].jamPlg tidak null
      if (dataAPI.jamMsk !== null && dataAPI.jamPlg !== null) {
        await AsyncStorage.setItem('sudah_pulang', 'true');
      } else {
        await AsyncStorage.setItem('sudah_pulang', 'false');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getJmlNotifApproval = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/notif/get-data-count',
        {
          headers,
        },
      );
      const dataAPI = response.data.dataCount;
      // console.log('Ini data API Jml notif APP:', dataAPI);
      dispatch(setJumlahApproval('approval', +dataAPI));
    } catch (error) {
      console.error(error);
      // Alert.alert('Peringatan', `Token anda telah expired`, [
      //   {
      //     text: 'Kembali ke Login',
      //     onPress: () => {
      //       navigation.replace('login');
      //     },
      //   },
      // ]);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataIsAbsen(headers);
        getJmlNotifApproval(headers);
        setDataJmlNotifMasingMasingApproval(dispatch, headers);
      })
      .catch(error => console.log(error));
  }, [dispatch]);
  useEffect(() => {
    // render notif //
    getToken().then(() => {
      countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
        // console.log(
        //   'Jumlah ID dengan status false:',
        //   jumlahDataDenganStatusFalse,
        // );
        // setJmlBlmBaca(+jumlahDataDenganStatusFalse)
        dispatch(
          setJumlahPengumuman('pengumuman', +jumlahDataDenganStatusFalse),
        );
        // setJmlPengumuman(+jumlahDataDenganStatusFalse);

        ////////////////////////////////////////////
        // ini untuk jumlah Approval
        // setJumlahApproval(10);
      });
    });

    /////////////////
  }, [dispatch]);

  // useEffect(() => {
  //   // Start the background timer
  //   if (isRole === 'EMPL') {
  //     const timerId = BackgroundTimer.setInterval(() => {
  //           pushNewAnnouncementNotification({navigation})
  //             .then(() => {
  //               console.log('Notification pushed successfully.');
  //             })
  //             .catch(error => {
  //               console.error('Error pushing notification:', error);
  //             });
  //     }, 10000); // Set the interval to your desired time in milliseconds (e.g., every 10 seconds)
  //     return () => {
  //       BackgroundTimer.clearInterval(timerId);
  //     };
  //   } else {
  //           const timerId = BackgroundTimer.setInterval(() => {
  //             pushNewAnnouncementNotification({navigation})
  //               .then(() => {
  //                 console.log('Notification pushed successfully.');
  //               })
  //               .catch(error => {
  //                 console.error('Error pushing notification:', error);
  //               });
  //             pushNewApprovalNotification({navigation})
  //               .then(() => {
  //                 console.log('Notification pushed successfully.');
  //               })
  //               .catch(error => {
  //                 console.error('Error pushing notification:', error);
  //               });
  //           }, 10000); // Set the interval to your desired time in milliseconds (e.g., every 10 seconds)
  //           return () => {
  //             BackgroundTimer.clearInterval(timerId);
  //           };
  //   }

  //   // Clean up the timer when the component unmounts
  // }, [navigation, isRole]); // Run this effect whenever the navigation object changes

  // Start a timer that runs continuous after X milliseconds

  // useEffect(() => {
  //   const ambilLokasi = async () => {
  //     try {
  //       const locationData = await getLocation();
  //       if (locationData.latitude !== null && locationData.longitude !== null) {
  //         const dataLokasi = {
  //           latitude: locationData.latitude,
  //           longitude: locationData.longitude,
  //           accuracy: locationData.accuracy,
  //         };
  //         // Cek apakah token sudah ada dan valid
  //         setLokasiTerkini(dataLokasi)
  //         const token = await getDataFromSession('token');
  //         if (token !== null) {
  //           const headers = {
  //             Authorization: `Bearer ${token}`,
  //           };

  //           try {
  //             console.log('data lokasi : ', dataLokasi);
  //             // console.log('data lokasi state : ', lokasiTerkini);
  //             // Kirim data lokasi dengan menggunakan token
  //             kirimLokasiTerkini(headers, dataLokasi)
  //             console.log('Lokasi terkini berhasil dikirim');
  //           } catch (error) {
  //             console.log('Gagal mengirim lokasi terkini', error);
  //           }
  //         } else {
  //           console.log('Token tidak valid atau tidak tersedia.');
  //         }
  //       } else {
  //         console.log('Lokasi tidak valid:', locationData);
  //       }
  //     } catch (error) {
  //       console.log('Kesalahan saat mengambil lokasi:', error);
  //     }
  //   };
  //   ambilLokasi();
  // }, [])

  // const intervalId = BackgroundTimer.setInterval( () => {
  //   ambilLokasi()
  // }, 20000)
  // // Cleanup the interval when the component unmounts
  // useEffect(() => {
  //   return () => {
  //     // Stop the interval when the component unmounts
  //     BackgroundTimer.clearInterval(intervalId);
  //   };
  // }, [intervalId]);
  // useEffect(() => {
  //   const ambilLokasi = async () => {
  //     try {
  //       const locationData = await getLocation();
  //       if (locationData.latitude !== null && locationData.longitude !== null) {
  //         const dataLokasi = {
  //           latitude: locationData.latitude,
  //           longitude: locationData.longitude,
  //           accuracy: locationData.accuracy,
  //         };
  //         setLokasiTerkini(dataLokasi);
  //         console.log('berhasil ambil lokasi', dataLokasi);
  //       } else {
  //         console.log('Lokasi tidak valid:', locationData);
  //       }
  //     } catch (error) {
  //       console.log('Kesalahan saat mengambil lokasi:', error);
  //     }
  //   };
  //   ambilLokasi();
  // }, []);

  // const kirimLokasiTerkini = async (headers, dataLokasi) => {
  //   try {
  //     const res = await axios.post(
  //       API_URL + '/api/tracking/post-location-history',
  //       {dataLokasi},
  //       {headers},
  //     );
  //     console.log('Lokasi terkini berhasil dikirim', res.data);
  //   } catch (error) {
  //     console.log('Gagal mengirim lokasi terkini', error);
  //   }
  // };

  // Ambil lokasi tanpa BackgroundTimer

  // Atur interval untuk mengambil lokasi setiap X detik menggunakan BackgroundTimer
  // const intervalId = BackgroundTimer.setInterval(async () => {
  //   await kirimLokasiTerkini(headers);
  // }, 20000); // Contoh: Ambil lokasi setiap 20 detik

  // // Cleanup saat komponen di-unmount atau saat interval dihentikan
  // return () => {
  //   BackgroundTimer.clearInterval(intervalId);
  // };
  useEffect(() => {
    kirimLokasiTracking()
  }, []);
  // import AsyncStorage from '@react-native-async-storage/async-storage';

  // Mendapatkan semua kunci dari AsyncStorage
  AsyncStorage.getAllKeys()
    .then(keys => {
      // Menampilkan semua kunci
      console.log('All keys in AsyncStorage:', keys);
    })
    .catch(error => {
      console.error('Error reading AsyncStorage keys:', error);
    });

  return (
    <View style={{backgroundColor: Color.green, flex: 1}}>
      <View>
        <HapusChace />
      </View>
      <View>
        <ButtonLogout
          navigation={navigation}
          posisiLogout={{top: hp('2%')}}
          style={{height: hp('10%')}}
        />
      </View>
      <View style={styles.wrapDataPribadi}>
        <DataPribadi
          styleDataPribadi={styles.lebarDataPribadi}
          stylePP={styles.ukuranPP}
          navigation={navigation}
        />
      </View>
      <Image
        style={styles.VectorAtasDashboard}
        resizeMode="contain"
        source={require('../../assets/vector/VectorAtasDashboard.png')}
      />
      <View style={styles.containerInfo}>
        <Text style={styles.judulSection}>Statistik Tahun ini</Text>
        <StatistikTahunIni
          styleContainerCard={styles.styleConatinerCard}
          styleCard={styles.ukuranCard}
          styleInfo={styles.styleInfo}
          styleTitle={styles.titleInfo}
          style={styles.styleStatistikTahunIni}
        />
        <View style={styles.containerMenu}>
          <Text style={styles.judulSectionMenu}>menu utama</Text>
          <MenuUtama
            styleImage={styles.imgIcon}
            styleNamaMenu={styles.namaMenu}
            wrapIcon={styles.wrapImgIcon}
            gap={styles.gapMenuIcon}
            box={styles.boxMenuIcon}
            navigation={navigation}
            jml_blm_baca={jmlBlmBaca}
          />
        </View>
      </View>
    </View>
  );
};
export default ScreenDashboard;

const styles = StyleSheet.create({
  containerInfo: {
    backgroundColor: Color.white,
    width: wp('100%'),
    height: hp('70%'),
    alignItems: 'center',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
  },
  containerMenu: {
    width: wp('100%'),
    height: hp('43%'),
    backgroundColor: Color.green,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
  },
  judulSection: {
    marginVertical: hp('2%'),
    fontSize: hp('2%'),
    fontFamily: text.bold,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  judulSectionMenu: {
    marginVertical: hp('1.5%'),
    fontSize: hp('2.5%'),
    fontFamily: text.bold,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  wrapDataPribadi: {
    height: hp('15%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  lebarDataPribadi: {
    width: wp('75%'),
  },
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
  styleConatinerCard: {
    height: hp('6.6%'),
    width: wp('22%'),
  },
  ukuranCard: {
    height: hp('6.6%'),
    width: wp('17%'),
  },
  styleInfo: {
    fontSize: hp('2%'),
  },
  titleInfo: {
    fontSize: hp('1.3%'),
  },
  styleStatistikTahunIni: {
    width: wp('90%'),
    height: hp('22%'),
  },
  imgIcon: {
    width: wp('16%'),
    height: hp('9%'),
  },
  namaMenu: {
    fontSize: hp('1.8%'),
  },
  wrapImgIcon: {
    gap: wp('10%'),
    height: hp('35%'),
    justifyContent: 'center',
  },
  gapMenuIcon: {
    gap: wp('10%'),
    width: wp('100%'),
    justifyContent: 'center',
  },
  boxMenuIcon: {
    width: wp('29%'),
  },
  VectorAtasDashboard: {
    position: 'absolute',
    top: hp('-1%'),
    right: wp('-10%'),
    zIndex: -1,
    width: wp('100%'),
  },
});
