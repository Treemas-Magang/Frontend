/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CardInfo from '../molecules/CardInfo';
import {Color} from '../../utils/color';

const initialState = {
  masuk: 28,
  telat_masuk: 11,
  pulang_cepat: 4,
  cuti: 3,
  sakit: 2,
  tidak_masuk: 0,
};

const StatistikTahunIni = () => {
  const [statistik, setStatistik] = useState(initialState);
  return (
    <View style={styles.info}>
      <CardInfo
        color={Color.cardMasuk}
        title="masuk"
        cardInfo={statistik.masuk}
      />
      <CardInfo
        color={Color.cardTelatMasuk}
        title="telat masuk"
        cardInfo={statistik.telat_masuk}
      />
      <CardInfo
        color={Color.cardPulangCepat}
        title="pulang cepat"
        cardInfo={statistik.pulang_cepat}
      />
      <CardInfo color={Color.cardCuti} title="cuti" cardInfo={statistik.cuti} />
      <CardInfo
        color={Color.cardSakit}
        title="sakit"
        cardInfo={statistik.sakit}
      />
      <CardInfo
        color={Color.cardTidakMasuk}
        title="tidak masuk"
        cardInfo={statistik.tidak_masuk}
      />
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
