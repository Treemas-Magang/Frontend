/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import IconMenu from '../atoms/IconMenu';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';

const MenuPengumuman = ({navigation}) => {
  const [jumlahPengumuman, setJumlahPengumuman] = useState(null);
  const [jumlahApproval, setJumlahApproval] = useState(null);

  useEffect(() => {
    setJumlahApproval(10);
    setJumlahPengumuman(5);
  }, []);


  const moveTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.wrapperIconMenu}>
      <View style={styles.wrap}>
        <IconMenu
          image={require('../../assets/vector/announcement.png')}
          title="pengumuman"
          onPress={() => moveTo('notifPengumuman')}
        />
        {
          jumlahPengumuman ? (<View style={styles.notif}><Text style={styles.text}>{jumlahPengumuman}</Text></View>) : ''
        }
      </View>
      <View style={styles.wrap}>
        <IconMenu
          image={require('../../assets/vector/aprroval.png')}
          title="approval"
          onPress={() => moveTo('approval')}
        />
        {
          jumlahApproval ? (<View style={styles.notif}><Text style={styles.text}>{jumlahApproval}</Text></View>) : ''
        }
      </View>
    </View>
  );
};

export default MenuPengumuman;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 78,
    justifyContent: 'center',
    marginVertical: 50,
  },
  wrap:{
    position: 'relative',
  },
  notif:{
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
  text:{
    minWidth: 20,
    textAlign: 'center',
    color: Color.white,
    fontFamily: text.bold,
    fontSize: 12
  },
});
