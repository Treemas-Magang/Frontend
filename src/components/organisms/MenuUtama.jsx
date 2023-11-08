/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, View, Text} from 'react-native';
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
}) => {
  const [totalApproval, setTotalApproval] = useState(5);
  const [totalPengumuman, setTotalPengumuman] = useState(6);
  const [isRole, setIsRole] = useState('');

  const totalNotive = totalApproval + totalPengumuman;

  useEffect(() => {
    getDataFromSession('role')
    .then((data) => {
      console.log('role : ', data)
      setIsRole(data)
    })
    .catch(error => console.log(error))
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
        {isRole === 'USER' ? (
          <View>
            <IconMenu
              image={require('../../assets/vector/announcement.png')}
              title="pengumuman"
              onPress={() => moveTo('notifPengumuman')}
              styleImage={styleImage}
              styleNamaMenu={styleNamaMenu}
              box={box}
            />
            {totalPengumuman ? (
              <View style={styles.notif}>
                <Text style={styles.text}>{totalPengumuman}</Text>
              </View>
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
            {totalPengumuman ? (
              <View style={styles.notif}>
                <Text style={styles.text}>{totalNotive}</Text>
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
