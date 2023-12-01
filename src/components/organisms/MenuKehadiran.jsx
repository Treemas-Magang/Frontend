/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  return (
    <ScrollView contentContainerStyle={scrollViewContent}>
      <View style={[styles.wrapperIconMenu, wrapIcon]}>
        <View
          style={[
            {
              flexDirection: 'row',
            },
            gap,
          ]}>
          {isAbsen === 'true' ? (
            <IconMenu
              image={require('../../assets/vector/kehadiran.png')}
              title="Absensi"
              onPress={() => moveTo('absensi')}
              styleImage={styleImage}
              styleNamaMenu={styleNamaMenu}
              box={box}
            />
          ) : (
            <IconMenu
              image={require('../../assets/vector/kehadiran.png')}
              title="Absensi"
              onPress={() => moveTo('pilihProject')}
              styleImage={styleImage}
              styleNamaMenu={styleNamaMenu}
              box={box}
            />
          )}

          <IconMenu
            image={require('../../assets/vector/member.png')}
            title="Member"
            onPress={() => moveTo('listMemberProject')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
        </View>
        <View style={[{flexDirection: 'row'}, gap]}>
          <IconMenu
            image={require('../../assets/vector/updatelistproject.png')}
            title="Update List Project"
            onPress={() => moveTo('updateListProject')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          <IconMenu
            image={require('../../assets/vector/listbelumpulang.png')}
            title="Belum Absen Pulang"
            onPress={() => moveTo('belumAbsenPulang')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
        </View>
        <View style={[{flexDirection: 'row'}, gap]}>
          <IconMenu
            image={require('../../assets/vector/Cuti.png')}
            title="Cuti"
            onPress={() => moveTo('cekCuti')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          <View style={box} />
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
