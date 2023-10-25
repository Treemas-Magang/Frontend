/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconMenu from '../atoms/IconMenu';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const MenuUtama = ({navigation}) => {
  const [totalPengumuman, setTotalPengumuman] = useState(null);

  useEffect(() => {
    setTotalPengumuman(15);
  }, []);

  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={styles.wrapperIconMenu}>
      <IconMenu
        image={require('../../assets/vector/schedule.png')}
        title="Kehadiran"
        onPress={() => moveTo('dashboardKehadiran')}
      />
      <IconMenu
        image={require('../../assets/vector/rekap.png')}
        title="rekap"
        onPress={() => moveTo('dashboardRekap')}
      />
      <IconMenu
        image={require('../../assets/vector/folders.png')}
        title="form"
        onPress={() => moveTo('dashboardForm')}
      />
      <View style={styles.wrap}>
        <IconMenu
          image={require('../../assets/vector/announcement.png')}
          title="pengumuman"
          onPress={() => moveTo('dashboardNotif')}
        />
        {totalPengumuman ? (
          <View style={styles.notif}>
            <Text style={styles.text}>{totalPengumuman}</Text>
          </View>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

export default MenuUtama;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 78,
    justifyContent: 'center',
    marginVertical: 50,
  },
  notif: {
    padding: 10,
    backgroundColor: Color.red,
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: -20,
    borderRadius: 25,
    textAlign: 'center',
    borderWidth: 5,
    borderColor: Color.green,
  },
  text: {
    minWidth: 20,
    textAlign: 'center',
    color: Color.white,
    fontFamily: text.bold,
    fontSize: 12,
  },
});
