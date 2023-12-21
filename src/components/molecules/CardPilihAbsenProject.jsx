/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAbsenPulang, setUpdateAbsen, setIsWFH} from '../../redux';
import {getDataFromSession} from '../../utils/getDataSession';
import getLocation from '../../utils/getLocation';
import {getAlamat} from '../../utils/getAlamat';
import {hitungJarak} from '../../utils/hitungJarak';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';
import { useRoute } from '@react-navigation/native';

// State untuk inisialisasi lokasi perusahaan dan lokasi user
const initialLokasiPerusahaan = {
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

// Komponen utama CardPilihAbsenProject
const CardPilihAbsenProject = ({navigation}) => {
  // const {other} = useRoute().params;
  const {isOther} = useSelector(state => state.IsOtherReducer);
  console.log('ini other', isOther)
  // Dispatch untuk mengirim aksi Redux
  const dispatch = useDispatch();

  // State untuk menyimpan status absen (ON SITE atau WORK FROM HOME)
  const [isAbsen, setIsAbsen] = useState('');

  // Selector untuk mendapatkan data proyek dari Redux store
  const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);

  // State untuk menyimpan lokasi saat ini dan lokasi perusahaan
  const [currentLocation, setCurrentLocation] = useState(initialLokasiUser);
  const [lokasiPerusahaan, setLokasiPerusahaan] = useState(
    initialLokasiPerusahaan,
  );

  // State untuk menandai apakah jarak terlalu jauh atau tidak
  const [isJarakTerlaluJauh, setIsJarakTerlaluJauh] = useState(false);

  // Mengambil lokasi perusahaan dari data proyek yang dipilih
  useEffect(() => {
    setLokasiPerusahaan({
      ...lokasiPerusahaan,
      latitude: dataProject.gpsLatProj,
      longitude: dataProject.gpsLongProj,
    });
  }, []);

  // Mengambil lokasi user saat ini dan melakukan beberapa tindakan setelahnya
  useEffect(() => {
    const ambilLokasi = async () => {
      try {
        const locationData = await getLocation();
        console.log('Lokasi berhasil diambil:', locationData);

        // Mendapatkan alamat dari koordinat lokasi
        getAlamat(
          locationData.latitude,
          locationData.longitude,
          'AIzaSyA1tH4Nq364y6knELo5DwSWIwyvxNRF2b8',
        )
          .then(data => {
            console.log('alamat : ', data);
            // Update data absen masuk
            dispatch(setUpdateAbsen('lokasiMsk', data));
            dispatch(setUpdateAbsen('gpsLatitudeMsk', locationData.latitude));
            dispatch(setUpdateAbsen('gpsLongitudeMsk', locationData.longitude));
            dispatch(setUpdateAbsen('projectId', dataProject.projectId));

            // Update data absen pulang
            dispatch(setAbsenPulang('lokasiPlg', data));
            dispatch(setAbsenPulang('gpsLatitudePlg', locationData.latitude));
            dispatch(setAbsenPulang('gpsLongitudePlg', locationData.longitude));
            dispatch(setAbsenPulang('projectId', dataProject.projectId));
          })
          .catch(error => console.log(error));

        // Update lokasi saat ini
        setCurrentLocation({
          ...currentLocation,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      } catch (error) {
        console.error('Kesalahan saat mengambil lokasi:', error);
      }
    };

    ambilLokasi();
  }, [setCurrentLocation]);

  // Menghitung jarak antara lokasi perusahaan dan lokasi user
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

      // Update data absen masuk dan pulang dengan jarak
      dispatch(setUpdateAbsen('jarakMsk', `${jarakBulat} meter`));
      dispatch(setAbsenPulang('jarakPlg', `${jarakBulat} meter`));

      // Batas jarak maksimum untuk absen masuk
      const jarakMaxMasuk = parseInt(dataProject.jrkMax);
      console.log('jarak max masuk : ', jarakMaxMasuk);

      // Cek apakah jarak terlalu jauh
      if (jarakBulat > jarakMaxMasuk) {
        setIsJarakTerlaluJauh(true);
      }
    } else {
      console.log('Salah satu lokasi tidak valid, jarak tidak dapat dihitung.');
    }
  }, [lokasiPerusahaan, currentLocation]);

  // Mengambil status absen dari penyimpanan sesi
  useEffect(() => {
    getDataFromSession('sudah_absen')
      .then(sudahAbsen => {
        setIsAbsen(sudahAbsen);
      })
      .catch(error => console.log(error));
  }, []);

  // Fungsi untuk pindah ke halaman tujuan sesuai dengan status absen yang dipilih
  const moveTo = (tujuan, isWFH, jrkTerlalujauh) => {
    dispatch(setIsWFH('isWFH', isWFH));
    navigation.navigate(tujuan, {jarakTerlaluJauh: jrkTerlalujauh});
  };

  return (
    <View>
      {isAbsen === 'true' ? (
        <>
        {
          isOther === '1' ? (
            <>
              <TouchableOpacity
                onPress={() => moveTo('formUpdateAbsensi', '0')}
                style={styles.CardPilihProject}>
                <Text style={styles.Text}>ON SITE</Text>
                <Text style={styles.TextDeskripsi}>asu</Text>
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
          )
        }
        </>
      ) : (
        <>
          {isOther === '1' ? (
            <>
              <TouchableOpacity
                onPress={() => moveTo('absensi', '0')}
                style={styles.CardPilihProject}>
                <Text style={styles.Text}>ON SITE</Text>
                <Text style={styles.TextDeskripsi}>asu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CardPilihProject}
                onPress={() => moveTo('absensi', '1')}>
                <Text style={styles.Text}>WORK FROM HOME</Text>
                <Text style={styles.TextDeskripsi}>
                  jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya,
                  Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326,
                  Indonesia
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
                  jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya,
                  Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326,
                  Indonesia
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default CardPilihAbsenProject;

// Styles untuk komponen CardPilihAbsenProject
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
