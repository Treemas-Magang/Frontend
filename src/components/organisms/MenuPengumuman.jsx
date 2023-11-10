/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import IconMenu from '../atoms/IconMenu';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const MenuPengumuman = ({
  navigation,
  wrapIcon,
  styleImage,
  styleNamaMenu,
  gap,
  box,
  jml_blm_baca
}) => {
  const [jumlahPengumuman, setJumlahPengumuman] = useState(null);
  const [jumlahApproval, setJumlahApproval] = useState(null);
  useEffect(() => {
    setJumlahApproval(10);
    setJumlahPengumuman(jml_blm_baca);
  }, [jml_blm_baca]);

  const moveTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={[styles.wrapperIconMenu, wrapIcon]}>
      <View
        style={[
          {
            flexDirection: 'row',
          },
          gap,
        ]}>
        <View style={styles.wrap}>
          <IconMenu
            image={require('../../assets/vector/announcement.png')}
            title="pengumuman"
            onPress={() => moveTo('notifPengumuman')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          {jumlahPengumuman ? (
            <View style={styles.notif}>
              <Text style={styles.text}>{jumlahPengumuman}</Text>
            </View>
          ) : (
            ''
          )}
        </View>
        <View style={styles.wrap}>
          <IconMenu
            image={require('../../assets/vector/aprroval.png')}
            title="approval"
            onPress={() => moveTo('approval')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          {jumlahApproval ? (
            <View style={styles.notif}>
              <Text style={styles.text}>{jumlahApproval}</Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </View>
  );
};

export default MenuPengumuman;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrap: {
    position: 'relative',
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
