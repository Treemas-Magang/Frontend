/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardNotif from '../molecules/CardNotif';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import SkeletonCardNotif from '../skeleton/SkeletonCardNotif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setJumlahPengumuman} from '../../redux';
import ButtonBackBaru from '../atoms/ButtonBackBaru';

const ListPengumuman = ({navigation}) => {
  const dispatch = useDispatch();
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const [dataPengumumanStorage, setDataPengumumanStorage] = useState([]);
  const [dataGabungan, setDataGabungan] = useState([]);
  // const [suksesSaveToStorage, setSuksesSavetoStorage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('')
  useEffect(() => {
    getDataFromSession('role')
    .then(data => {
      setRole(data);
    })
    .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getDataFromSession('token')
      .then(token => {
        if (token !== null) {
          getData(token); // Panggil getData setelah menerima token
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });
  }, []);

  const getData = async token => {
    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        'https://treemas-api-403500.et.r.appspot.com/api/master-data/announcement-view',
        {headers},
      );
      const data = response.data.data;
      setDataPengumuman(data);
      setIsLoading(false);
      const processedData = data.map(item => ({
        id: item.id,
        usrCrt: item.usrCrt,
        note: item.note,
        header: item.header,
        tgl_upload: item.tgl_upload,
        status: false,
      }));

      await checkAndSaveToStorage(processedData);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const saveDataToStorage = async data => {
    try {
      const dataToSave = JSON.stringify(data);
      await AsyncStorage.setItem('announcementData', dataToSave);
      console.log('Data berhasil disimpan ke AsyncStorage');
    } catch (error) {
      console.error('Gagal menyimpan data ke AsyncStorage:', error);
    }
  };

  const loadDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem('announcementData');

      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setDataPengumumanStorage(parsedData);
        console.log('Data ditemukan di AsyncStorage');
      } else {
        console.log('Data tidak ditemukan di AsyncStorage');
      }
    } catch (error) {
      console.error('Gagal mengambil data dari AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  const checkAndSaveToStorage = async data => {
    try {
      const dataToSave = [...data];
      const dataFromStorage = await AsyncStorage.getItem('announcementData');

      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);

        for (const item of dataToSave) {
          const existingItem = parsedData.find(
            storageItem => storageItem.id === item.id,
          );

          if (existingItem) {
            if (existingItem.status === true) {
              console.log(
                `ID ${item.id} sudah memiliki status true di AsyncStorage, skip penyimpanan.`,
              );
              continue;
            } else {
              existingItem.usrCrt = item.usrCrt;
              existingItem.note = item.note;
              existingItem.header = item.header;
              existingItem.tgl_upload = item.tgl_upload;
            }
          } else {
            parsedData.push(item);
          }
        }

        await AsyncStorage.setItem(
          'announcementData',
          JSON.stringify(parsedData),
        );
        console.log('Data berhasil disimpan ke AsyncStorage');
      } else {
        await AsyncStorage.setItem(
          'announcementData',
          JSON.stringify(dataToSave),
        );
        console.log('Data berhasil disimpan ke AsyncStorage');
      }
    } catch (error) {
      console.error('Gagal menyimpan data ke AsyncStorage:', error);
    }
  };

  const updateStatusInStorage = async id => {
    try {
      // Mengambil data dari AsyncStorage
      const dataFromStorage = await AsyncStorage.getItem('announcementData');

      if (dataFromStorage !== null) {
        // Jika data ditemukan, parse data JSON
        const parsedData = JSON.parse(dataFromStorage);

        // Cari item dengan id yang sesuai dalam data tersebut
        const itemToUpdate = parsedData.find(item => item.id === id);

        if (itemToUpdate) {
          // Jika item ditemukan, ubah status menjadi true
          itemToUpdate.status = true;

        // Simpan data yang telah diubah kembali ke AsyncStorage
        await AsyncStorage.setItem(
          'announcementData',
          JSON.stringify(parsedData),
        );
        console.log(
          `Status untuk ID ${id} berhasil diubah menjadi true di AsyncStorage`,
        );
      } else {
        // Item dengan id yang diberikan tidak ditemukan
        console.log(`Item dengan ID ${id} tidak ditemukan.`);
      }
    } else {
      // Data tidak ditemukan di AsyncStorage
      console.log('Data tidak ditemukan di AsyncStorage');
    }
  } catch (error) {
    console.error('Gagal mengubah status di AsyncStorage:', error);
  }
};

  // Panggil fungsi updateStatusInStorage saat handleReadNotif dijalankan
  const handleReadNotif = async id => {
    // Panggil fungsi untuk mengubah status
    updateStatusInStorage(id);
    // ... kode lainnya
    const updatedDataPengumuman = dataGabungan.map(item => {
      if (item.id === id) {
        return {...item, status: true};
      }
      return item;
    });

    // Set dataPengumuman yang telah diperbarui
    setDataGabungan(updatedDataPengumuman);
  };
  useEffect(() => {
    // Fungsi untuk menggabungkan status
    const combineStatus = (DP, DPS) => {
      const combinedData = DP.map(item => {
        const matchingStorageItem = DPS.find(
          storageItem => storageItem.id === item.id,
        );
        if (matchingStorageItem) {
          // Jika item dengan ID yang cocok ditemukan di storage, gunakan status dari storage
          return {
            ...item,
            status: matchingStorageItem.status,
          };
        } else {
          // Jika tidak ditemukan, gunakan status default (false)
          return {
            ...item,
            status: false,
          };
        }
      });
      return combinedData;
    };

    // Panggil fungsi combineStatus untuk menggabungkan status
    const combinedData = combineStatus(dataPengumuman, dataPengumumanStorage);

    // Simpan hasil gabungan ke state dataGabungan
    setDataGabungan(combinedData);
    console.log('data berhasil di gabung');
  }, [dataPengumuman, dataPengumumanStorage]);

  const moveTo = (tujuan, judul, deskripsi, usrCrt, image, id) => {
    navigation.navigate(tujuan, {
      judul: judul,
      deskripsi: deskripsi,
      usrCrt: usrCrt,
      image: image,
      id: id,
    });
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      {/* <ButtonBack navigation={navigation} /> */}
      {role === 'USER' ? (
        <ButtonBackBaru navigation={navigation} tujuan="dashboard" />
      ) : (
        <ButtonBackBaru navigation={navigation} tujuan="dashboardNotif" />
      )}
      <ButtonHome navigation={navigation} />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Pengumuman</Text>
      </View>
      <View style={styles.backgroundCardNotif}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <>
              <SkeletonCardNotif />
              <SkeletonCardNotif />
              <SkeletonCardNotif />
              <SkeletonCardNotif />
              <SkeletonCardNotif />
            </>
          ) : (
            dataGabungan
              .sort((a, b) => b.id - a.id)
              .map((Pengumuman, index) => (
                <CardNotif
                  key={index}
                  onPress={() => {
                    handleReadNotif(Pengumuman.id);
                    moveTo(
                      'detailPengumuman',
                      Pengumuman.header,
                      Pengumuman.note,
                      Pengumuman.usrCrt,
                      Pengumuman.image64,
                      Pengumuman.id,
                    );
                  }}
                  deskripsi={Pengumuman.note}
                  tanggal={Pengumuman.tgl_upload}
                  judul={Pengumuman.header}
                  navigation={navigation}
                  id={Pengumuman.id}
                  status={Pengumuman.status}
                />
              ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListPengumuman;

const styles = StyleSheet.create({
  backgroundCardNotif: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingBottom: 90,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
