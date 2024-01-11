/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Color} from '../../utils/color';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  countDataWithFalseStatus,
  getToken,
} from '../../utils/buatStatusPengumumanFalse';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAnglesLeft, faBroom} from '@fortawesome/free-solid-svg-icons';
import {setJumlahPengumuman} from '../../redux';
import {text} from '../../utils/text';

const HapusChace = ({navigation, style, posisiLogout}) => {
  const [isOpenCache, setIsOpenCache] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const openCache = () => {
    setIsOpenCache(!isOpenCache);
    setIsClicked(!isClicked);
  };
  const lebarCachce = {lebarAwal: 43, lebarAkhir: 133};

  const dispatch = useDispatch();
  const handleButton = () => {
    Alert.alert(
      'Clear Cache',
      'Apa anda yakin ingin Clear Cache ?',
      [
        {
          text: 'OK',
          onPress: () => {
            clearAllData();
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const clearAllData = async () => {
    try {
      // Kunci yang ingin dihapus
      const keysToRemove = [
        'announcementData',
        'prevData',
        'prevDataAbsenPulang',
        'prevDataCutiWeb',
        'prevDataLembur',
        'prevDataLibur',
        'prevDataReimburse',
        'prevDataCuti',
        'prevDataSakit',
      ];

      // Menghapus data untuk kunci tertentu
      await AsyncStorage.multiRemove(keysToRemove);

      console.log('Data successfully removed from AsyncStorage');
      getToken().then(() => {
        countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
          dispatch(
            setJumlahPengumuman('pengumuman', +jumlahDataDenganStatusFalse),
          );
        });
      });
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {isClicked ? (
        <View
          style={[
            styles.clearCacheClicked,
            !isOpenCache
              ? {width: lebarCachce.lebarAwal}
              : {
                  width: lebarCachce.lebarAkhir,
                  alignItems: 'flex-end',
                  paddingRight: 10,
                },
          ]}>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => openCache()}>
              <FontAwesomeIcon
                icon={!isOpenCache ? faBroom : faAnglesLeft}
                size={25}
                color={Color.white}
                style={{zIndex: 999, marginRight: 5}}
              />
            </TouchableOpacity>
            {!isOpenCache ? (
              ''
            ) : (
              <TouchableOpacity onPress={handleButton}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center', // Center vertically
                    // backgroundColor: 'blue',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 20,
                      color: Color.white,
                      width: '65%',
                      height: '80%',
                      fontSize: 10,
                      fontFamily: text.bold,
                      textAlign: 'center',
                      marginTop: 40,
                    }}>
                    CLEAR CACHE
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.clearCache,
            !isOpenCache
              ? {width: lebarCachce.lebarAwal}
              : {
                  width: lebarCachce.lebarAkhir,
                  alignItems: 'flex-end',
                  paddingRight: 10,
                },
          ]}>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => openCache()}>
              <FontAwesomeIcon
                icon={!isOpenCache ? faBroom : faBroom}
                size={25}
                color={Color.red}
                style={{zIndex: 99, marginRight: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default HapusChace;

const styles = StyleSheet.create({
  clearCache: {
    position: 'absolute',
    left: 0,
    height: 40,
    backgroundColor: Color.white,
    width: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  clearCacheClicked: {
    position: 'absolute',
    left: 0,
    height: 40,
    backgroundColor: Color.red,
    width: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
});
