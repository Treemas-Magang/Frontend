/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAbsenPulang, setUpdateAbsen, setIsWFH } from '../../redux';
import { getDataFromSession } from '../../utils/getDataSession';
import { getTanggalSekarang } from '../../utils/getTanggalSekarang';
import getLocation from '../../utils/getLocation';
import { getAlamat } from '../../utils/getAlamat';
import { hitungJarak } from '../../utils/hitungJarak';


const initialLokasiPerusahaan = {
  // latitude: -6.245091550324631,
  // longitude: 106.6712797641271,
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};
const initialLokasiUser = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};
const CardPilihAbsenProject = ({navigation}) => {
    const dispatch = useDispatch();
    const [isAbsen, setIsAbsen] = useState('');
    const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
    // console.log('dataProject dari reducer : ', dataProject);
      const [currentLocation, setCurrentLocation] = useState(initialLokasiUser);
  const [lokasiPerusahaan, setLokasiPerusahaan] = useState(initialLokasiPerusahaan);
  const [isJarakTerlaluJauh, setIsJarakTerlaluJauh] = useState(false);

  //simpan lokasi perusahaan
    useEffect(() => {
      setLokasiPerusahaan({
        ...lokasiPerusahaan,
        latitude: dataProject.gpsLatProj,
        longitude: dataProject.gpsLongProj,
      });
    }, []);
    //simpan lokasi user saat ini
      useEffect(() => {
        const ambilLokasi = async () => {
          const {date, time, dayName} = getTanggalSekarang();
          try {
            const locationData = await getLocation();
            console.log('Lokasi berhasil diambil:', locationData);
            getAlamat(
              locationData.latitude,
              locationData.longitude,
              'AIzaSyA1tH4Nq364y6knELo5DwSWIwyvxNRF2b8',
            )
              .then(data => {
                console.log('alamat : ', data);
                dispatch(setUpdateAbsen('lokasiMsk', data));
                dispatch(
                  setUpdateAbsen('gpsLatitudeMsk', locationData.latitude),
                );
                dispatch(
                  setUpdateAbsen('gpsLongitudeMsk', locationData.longitude),
                );
                dispatch(setUpdateAbsen('projectId', dataProject.projectId));
                //absenPulang
                dispatch(setAbsenPulang('lokasiPlg', data));
                dispatch(
                  setAbsenPulang('gpsLatitudePlg', locationData.latitude),
                );
                dispatch(
                  setAbsenPulang('gpsLongitudePlg', locationData.longitude),
                );
                dispatch(setAbsenPulang('projectId', dataProject.projectId));
              })
              .catch(error => console.log(error));
            setCurrentLocation({
              ...currentLocation,
              latitude: locationData.latitude,
              longitude: locationData.longitude,
            });
            // setLocationLoaded(true);
          } catch (error) {
            console.error('Kesalahan saat mengambil lokasi:', error);
            // setLocationLoaded(true); // Set to true even in case of an error to prevent infinite loading.
          }
        };

        ambilLokasi();
      }, [setCurrentLocation]);
    // cek jarak update absen dari perusahaan
  useEffect(() => {
    if (
      lokasiPerusahaan.latitude &&
      lokasiPerusahaan.longitude &&
      currentLocation.latitude &&
      currentLocation.longitude
    ) {
      const distance = hitungJarak(
        lokasiPerusahaan.latitude,
        lokasiPerusahaan.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
      );
      const jarakMeter = distance;
      const jarakBulat = Math.ceil(jarakMeter);
      console.log(`Jarak antara kedua titik adalah ${jarakMeter} meter.`);
      console.log(`Jarak antara kedua titik adalah ${jarakBulat} meter.`);
      dispatch(setUpdateAbsen('jarakMsk', `${jarakBulat} meter`));
      dispatch(setAbsenPulang('jarakPlg', `${jarakBulat} meter`));
      //jarak user ke kantor 100 = 100 meter
      const jarakMaxMasuk = parseInt(dataProject.jrkMax);
      console.log('jarak max masuk : ', jarakMaxMasuk);

        if (jarakBulat > jarakMaxMasuk) {
          // Alert.alert(
          //   'Peringatan',
          //   'Jarak Anda ke tempat kerja lebih dari 100 meter. Anda tidak dapat melakukan absen.',
          //   [
          //     {
          //       text: 'Kembali',
          //       onPress: () => {
          //         navigation.navigate('dashboard');
          //       },
          //     },
          //   ],
          // );
          setIsJarakTerlaluJauh(true);
        }
    } else {
      console.log('Salah satu lokasi tidak valid, jarak tidak dapat dihitung.');
    }
  }, [lokasiPerusahaan, currentLocation]);

    useEffect(() => {
      getDataFromSession('sudah_absen')
        .then(sudahAbsen => {
          setIsAbsen(sudahAbsen);
        })
        .catch(error => console.log(error));
    }, []);
  const moveTo = (tujuan, isWFH, jrkTerlalujauh) => {
    dispatch(setIsWFH('isWFH', isWFH));
    navigation.navigate(tujuan, {jarakTerlaluJauh: jrkTerlalujauh});
  };
  return (
    <View>
      {isAbsen === 'true' ? (
        <>
          <TouchableOpacity
            onPress={() => moveTo('formUpdateAbsensi', '0', isJarakTerlaluJauh)}
            style={styles.CardPilihProject}>
            <Text style={styles.Text}>ON SITE</Text>
            <Text style={styles.TextDeskripsi}>{dataProject.alamat}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('formUpdateAbsensi', '1')}>
            <Text style={styles.Text}>WORK FROM HOME</Text>
            <Text style={styles.TextDeskripsi}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => moveTo('absensi', '0')}
            style={styles.CardPilihProject}>
            <Text style={styles.Text}>ON SITE</Text>
            <Text style={styles.TextDeskripsi}>{dataProject.alamat}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('absensi', '1')}>
            <Text style={styles.Text}>WORK FROM HOME</Text>
            <Text style={styles.TextDeskripsi}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CardPilihAbsenProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: wp('70%'),
    minHeight: hp('15'),
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
    paddingVertical: 10,
  },
  TextDeskripsi: {
    fontFamily: text.extraLight,
    fontSize: 10,
    marginBottom: 20,
    color: Color.black,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
});
