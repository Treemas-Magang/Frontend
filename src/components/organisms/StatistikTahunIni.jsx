/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardInfo from '../molecules/CardInfo';
import {Color} from '../../utils/color';
import { getDataFromSession } from '../../utils/getDataSession';
import axios from 'axios';

const initialState = {
  totalCuti: 0,
  totalMasuk: 0,
  totalPulangCepat: 0,
  totalSakit: 0,
  totalTelatMasuk: 0,
  totalTidakMasuk: 0,
};

const StatistikTahunIni = ({
  style,
  styleCard,
  styleContainerCard,
  styleInfo,
  styleTitle,
}) => {
  const [statistik, setStatistik] = useState(initialState);

const getData = async headers => {
  try {
    const response = await axios.get(
      'http://192.168.10.31:8081/api/dashboard/main',
      {headers},
    );
    console.log(response.data.data);
    const dataAPI = response.data.data;
    setStatistik(dataAPI);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getData(headers);
      })
      .catch(error => console.log(error));
}, [])



  return (
    <View style={[styles.info, style]}>
      <CardInfo
        color={Color.cardMasuk}
        title="masuk"
        cardInfo={statistik.totalMasuk}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardTelatMasuk}
        title="telat masuk"
        cardInfo={statistik.totalTelatMasuk}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardPulangCepat}
        title="pulang cepat"
        cardInfo={statistik.totalPulangCepat}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardCuti}
        title="cuti"
        cardInfo={statistik.totalCuti}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardSakit}
        title="sakit"
        cardInfo={statistik.totalSakit}
        styleCard={styleCard}
        styleContainerCard={styleContainerCard}
        styleInfo={styleInfo}
        styleTitle={styleTitle}
      />
      <CardInfo
        color={Color.cardTidakMasuk}
        title="tidak masuk"
        cardInfo={statistik.totalTidakMasuk}
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
