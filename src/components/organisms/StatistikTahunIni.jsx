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

const StatistikTahunIni = ({
  style,
  styleCard,
  styleContainerCard,
  styleInfo,
  styleTitle,
}) => {
  const [statistik, setStatistik] = useState(initialState);
  return (
    <View style={[styles.info, style]}>
      <CardInfo
        color={Color.cardMasuk}
        title="masuk"
        cardInfo={statistik.masuk}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardTelatMasuk}
        title="telat masuk"
        cardInfo={statistik.telat_masuk}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardPulangCepat}
        title="pulang cepat"
        cardInfo={statistik.pulang_cepat}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardCuti}
        title="cuti"
        cardInfo={statistik.cuti}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardSakit}
        title="sakit"
        cardInfo={statistik.sakit}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardTidakMasuk}
        title="tidak masuk"
        cardInfo={statistik.tidak_masuk}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
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
    gap: 30,
    justifyContent: 'center',
  },
});
