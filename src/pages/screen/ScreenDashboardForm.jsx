/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import StatistikTahunIni from '../../components/organisms/StatistikTahunIni';
import ButtonLogout from '../../components/atoms/ButtonLogout';
import DataPribadi from '../../components/molecules/DataPribadi';
import MenuForm from '../../components/organisms/MenuForm';

const ScreenDashboardForm = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{alignItems: 'center', backgroundColor: Color.green}}>
      <ButtonLogout />
      <View
        style={{
          position: 'absolute',
          top: 80,
          width: 310,
        }}>
        <DataPribadi />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.judulSection}>Statistik Tahun ini</Text>
        <StatistikTahunIni />
      </View>
      <View style={styles.containerMenu}>
        <Text style={styles.judulSection}>form</Text>
        <MenuForm navigation={navigation} />
      </View>
    </View>
    </ScrollView>
  );
};
export default ScreenDashboardForm;

const styles = StyleSheet.create({
  containerInfo: {
    backgroundColor: Color.white,
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
    backgroundColor: Color.green,
    width: '100%',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    alignItems: 'center',
    marginTop: -50,
    height: 422,
    position: 'relative',
  },

  judulSection: {
    position: 'absolute',
    top: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: Color.blue,
    textTransform: 'uppercase',
  },
});
