import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAnglesLeft, faAnglesRight} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Color} from '../../utils/color';

const ButtonLogout = () => {
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  const openLogout = () => {
    setIsOpenLogout(!isOpenLogout); // Menggunakan !isOpenLogout untuk mengubah nilainya.
  };

  const lebarLogout = {
    lebarAwal: 43,
    lebarAkhir: 133,
  };
  return (
    <View style={{height: 224, width: '100%', position: 'relative'}}>
      <View
        style={[
          styles.logout,
          !isOpenLogout
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
              icon={!isOpenLogout ? faAnglesLeft : faAnglesRight}
              size={25}
              color={Color.white}
            />
          </TouchableOpacity>
          {!isOpenLogout ? (
            ''
          ) : (
            <Text
              style={{
                marginHorizontal: 20,
                fontWeight: 'bold',
                color: Color.white,
                width: '100%',
              }}>
              LOGOUT
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ButtonLogout;

const styles = StyleSheet.create({
  logout: {
    position: 'absolute',
    right: 0,
    height: 40,
    backgroundColor: Color.red,
    width: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    top: 25,
  },
});
