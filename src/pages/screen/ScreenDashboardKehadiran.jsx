/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import DataPribadi from '../../components/molecules/DataPribadi';
import MenuKehadiran from '../../components/organisms/MenuKehadiran';
import {getDataFromSession} from '../../utils/getDataSession';
import {text} from '../../utils/text';

const ScreenDashboardKehadiran = ({navigation}) => {
  const [isToken, setIsToken] = useState();
  console.log('ini token : ', isToken);
  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        if (token !== null) {
          setIsToken(token);
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Color.green,
          minHeight: '100%',
        }}>
        <ButtonLogout navigation={navigation} />
        <View style={{position: 'absolute', top: 80, width: 310}}>
          <DataPribadi />
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.judulSection}>Statistik Tahun ini</Text>
          <StatistikTahunIni />
        </View>
        <View style={styles.containerMenu}>
          <Text style={styles.judulSection}>Kehadiran</Text>
          <MenuKehadiran navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ScreenDashboardKehadiran;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  containerInfo: {
    backgroundColor: Color.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300, // Adjust this height as needed
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    position: 'relative',
    marginTop: -30,
  },
  containerMenu: {
    backgroundColor: Color.green,
    width: '100%',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
    marginTop: -50,
    minHeight: '100%', // Adjust this height as needed
    position: 'relative',
  },
  judulSection: {
    position: 'absolute',
    top: 10,
    fontSize: 16,
    fontFamily: text.bold,
    color: Color.blue,
    textTransform: 'uppercase',
  },
});
