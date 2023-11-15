/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuKehadiran = ({
  navigation,
  wrapIcon,
  styleImage,
  styleNamaMenu,
  gap,
  box,
  scrollViewContent,
}) => {
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
          <IconMenu
            image={require('../../assets/vector/kehadiran.png')}
            title="Absensi"
            onPress={() => moveTo('pilihProject')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
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
            onPress={() => moveTo('belumabsenpulang')}
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
        <View style={{width: 70, height: 70, marginBottom: 5}} />
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
