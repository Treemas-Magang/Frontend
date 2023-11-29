/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../utils/color';
import { notification } from '../../utils/notifikasi';
import axios from 'axios';

const ScreenTesNotifikasi = () => {
const [dataAllPengumuman, setDataAllPengumuman] = useState([]);


    const pushPesan = (judul, isi) => {
        notification.configure();
        notification.buatChannel('channel_4');
        notification.kirimNotifikasi(
          'channel_4',
          'judul halo',
          'isi pesadsd wws n',
        );
    };
  return (
    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
      <TouchableOpacity style={{backgroundColor: Color.blue, width: 100, height: 35}} onPress={() => pushPesan()}>
        <Text>Klik</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenTesNotifikasi