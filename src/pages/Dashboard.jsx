/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../utils/color';
import StatistikTahunIni from '../components/organisms/StatistikTahunIni';
import ButtonLogout from '../components/atoms/ButtonLogout';
import IconMenu from '../components/atoms/IconMenu';

const Dashboard = () => {
  return (
    <View style={{alignItems: 'center', backgroundColor: Color.primary}}>
      <ButtonLogout />
      <View style={styles.containerInfo}>
        <Text
          style={{
            position: 'absolute',
            top: 10,
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            color: Color.text,
          }}>
          Statistik Tahun ini
        </Text>
        <StatistikTahunIni />
      </View>
      <View style={styles.containerMenu}>
        <View style={styles.wrapperIconMenu}>
          <IconMenu
            image={require('../assets/vector/hide.png')}
            title="satuan"
          />
          <IconMenu
            image={require('../assets/vector/hide.png')}
            title="satuan"
          />
          <IconMenu
            image={require('../assets/vector/hide.png')}
            title="satuan"
          />
          <IconMenu
            image={require('../assets/vector/hide.png')}
            title="satuan"
          />
        </View>
      </View>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  containerInfo: {
    backgroundColor: Color.background,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    position: 'relative',
    marginTop: -30,
  },
  containerMenu: {
    backgroundColor: Color.primary,
    width: '100%',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
    marginTop: -50,
    height: '100%',
    position: 'relative',
  },
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 78,
    justifyContent: 'center',
    marginVertical: 40,
  },
});
