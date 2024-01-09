/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import IconMenu from '../atoms/IconMenu';
import {getDataFromSession} from '../../utils/getDataSession';

const MenuKehadiran = ({
  navigation,
  wrapIcon,
  styleImage,
  styleNamaMenu,
  gap,
  box,
  scrollViewContent,
}) => {
  const [isAbsen, setIsAbsen] = useState('');
  const [isRole, setIsRole] = useState('');

  useEffect(() => {
    getDataFromSession('dataProfilUser')
      .then(data => {
        const dataProfile = JSON.parse(data);
        setIsRole(dataProfile.role);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    getDataFromSession('sudah_absen')
      .then(sudahAbsen => {
        setIsAbsen(sudahAbsen);
        console.log('sudah Absen', sudahAbsen);
      })
      .catch(error => console.log(error));
  }, []);

  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };

  const renderMenu = () => {
    const menuItems = [
      {
        image: require('../../assets/vector/kehadiran.png'),
        title: 'Absensi',
        onPress: () => moveTo(isAbsen === 'true' ? 'absensi' : 'pilihProject'),
      },
      // Exclude 'Member' item when isRole is 'EMPL'
      ...(isRole !== 'EMPL'
        ? [
            {
              image: require('../../assets/vector/member.png'),
              title: 'Member',
              onPress: () => moveTo('listMemberProject'),
            },
          ]
        : []),
      {
        image: require('../../assets/vector/updatelistproject.png'),
        title: 'Update List Project',
        onPress: () => moveTo('updateListProject'),
      },
      {
        image: require('../../assets/vector/listbelumpulang.png'),
        title: 'Lupa Absen Pulang',
        onPress: () => moveTo('belumAbsenPulang'),
      },
      {
        image: require('../../assets/vector/Cuti.png'),
        title: 'Cuti',
        onPress: () => moveTo('cekCuti'),
      },
      ...(isRole !== 'EMPL'
        ? [
            {
              image: '',
              title: '',
            },
          ]
        : []),
    ];

    return menuItems.map((item, index) => (
      <IconMenu
        key={index}
        image={item.image}
        title={item.title}
        onPress={item.onPress}
        styleImage={styleImage}
        styleNamaMenu={styleNamaMenu}
        box={box}
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={scrollViewContent}>
      <View style={[styles.wrapperIconMenu, wrapIcon]}>
        <View
          style={[
            {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            },
            gap,
          ]}>
          {renderMenu()}
        </View>
        <View style={{width: 70, height: 60, marginBottom: 5}} />
      </View>
    </ScrollView>
  );
};

export default MenuKehadiran;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
