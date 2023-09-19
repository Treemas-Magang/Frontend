/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CardInfo from '../components/molecules/CardInfo';
import {Color} from '../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAnglesLeft, faAnglesRight} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  const openLogout = () => {
    setIsOpenLogout(!isOpenLogout); // Menggunakan !isOpenLogout untuk mengubah nilainya.
  };

  const lebarLogout = {
    lebarAwal: 43,
    lebarAkhir: 133,
  };
  return (
    <View style={{alignItems: 'center', backgroundColor: Color.primary}}>
      <View style={{height: 224, width: '100%', position: 'relative'}}>
        <View
          style={[
            styles.logout,
            isOpenLogout
              ? {width: lebarLogout.lebarAwal}
              : {
                  width: lebarLogout.lebarAkhir,
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => openLogout()}>
              <FontAwesomeIcon
                icon={isOpenLogout ? faAnglesLeft : faAnglesRight}
                size={25}
                color={Color.background}
              />
            </TouchableOpacity>
            {!isOpenLogout ? (
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  color: Color.background,
                }}>
                LOGOUT
              </Text>
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
      <View style={styles.containerInfo}>
        <Text
          style={{
            position: 'absolute',
            top: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Statistik Tahun ini
        </Text>
        <View style={styles.info}>
          <CardInfo color={Color.cardMasuk} title="masuk" cardInfo="4" />
          <CardInfo
            color={Color.cardTelatMasuk}
            title="tidak masuk"
            cardInfo="11"
          />
          <CardInfo
            color={Color.cardPulangCepat}
            title="pulang cepat"
            cardInfo="16"
          />
          <CardInfo color={Color.cardCuti} title="cuti" cardInfo="8" />
          <CardInfo color={Color.cardSakit} title="sakit" cardInfo="9" />
          <CardInfo
            color={Color.cardTidakMasuk}
            title="tidak masuk"
            cardInfo="0"
          />
        </View>
      </View>
      <View style={styles.containerMenu}>
        <Text>Menu utama</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 30,
    justifyContent: 'center',
  },
  containerInfo: {
    backgroundColor: Color.background,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    position: 'relative',
  },
  containerMenu: {
    backgroundColor: Color.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    marginTop: -30,
    height: '100%',
  },
  logout: {
    position: 'absolute',
    right: 0,
    height: 40,
    backgroundColor: 'red',
    width: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    top: 25,
  },
});
