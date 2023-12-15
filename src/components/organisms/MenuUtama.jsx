/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconMenu from '../atoms/IconMenu';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {getDataFromSession} from '../../utils/getDataSession';

const MenuUtama = ({
  navigation,
  wrapIcon,
  styleImage,
  styleNamaMenu,
  gap,
  box,
  jml_blm_baca,
}) => {
  const [isRole, setIsRole] = useState('');
  console.log('isRole : ', isRole)
  useEffect(() => {
    getDataFromSession('dataProfilUser')
      .then(data => {
        const dataProfile = JSON.parse(data);
        console.log('data profil menu utama : ', dataProfile);
        setIsRole(dataProfile.role);
      })
      .catch(error => console.log(error));
  }, []);
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={[styles.wrapperIconMenu, wrapIcon]}>
      <View
        style={{
          flexDirection: 'row',
          ...gap,
        }}>
        <IconMenu
          image={require('../../assets/vector/schedule.png')}
          title="Kehadiran"
          onPress={() => moveTo('dashboardKehadiran')}
          styleImage={styleImage}
          styleNamaMenu={styleNamaMenu}
          box={box}
        />
        <IconMenu
          image={require('../../assets/vector/rekap.png')}
          title="rekap"
          onPress={() => moveTo('dashboardRekap')}
          styleImage={styleImage}
          styleNamaMenu={styleNamaMenu}
          box={box}
        />
      </View>
      <View style={{flexDirection: 'row', ...gap}}>
        <IconMenu
          image={require('../../assets/vector/folders.png')}
          title="form"
          onPress={() => moveTo('dashboardForm')}
          styleImage={styleImage}
          styleNamaMenu={styleNamaMenu}
          box={box}
        />
        {isRole === 'EMPL' ? (
          <View>
            <IconMenu
              image={require('../../assets/vector/announcement.png')}
              title="pengumuman"
              onPress={() => moveTo('notifPengumuman')}
              styleImage={styleImage}
              styleNamaMenu={styleNamaMenu}
              box={box}
            />
            {jml_blm_baca ? (
              <TouchableOpacity
                style={styles.notif}
                onPress={() => {
                  moveTo('notifPengumuman');
                  // Anda dapat menambahkan logika tambahan di sini
                }}>
                <Text style={styles.text}>{jml_blm_baca}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <View>
            <IconMenu
              image={require('../../assets/vector/announcement.png')}
              title="pengumuman"
              onPress={() => moveTo('dashboardNotif')}
              styleImage={styleImage}
              styleNamaMenu={styleNamaMenu}
              box={box}
            />
            {jml_blm_baca ? (
              <View style={styles.notif}>
                <Text style={styles.text}>{jml_blm_baca}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

export default MenuUtama;

const styles = StyleSheet.create({
  wrapperIconMenu: {},
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
