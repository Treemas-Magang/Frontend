import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardInfo from '../molecules/CardInfo';
import {Color} from '../../utils/color';

const StatistikTahunIni = () => {
  return (
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
      <CardInfo color={Color.cardTidakMasuk} title="tidak masuk" cardInfo="0" />
    </View>
  );
};

export default StatistikTahunIni;

const styles = StyleSheet.create({
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 30,
    justifyContent: 'center',
  },
});
