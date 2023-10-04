import {StyleSheet, View} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuForm = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={styles.wrapperIconMenu}>
      <IconMenu
        image={require('../../assets/vector/Cuti.png')}
        title="Cuti"
        onPress={() => moveTo('')}
      />
      <IconMenu
        image={require('../../assets/vector/Sakit.png')}
        title="Sakit"
        onPress={() => moveTo('')}
      />
      <IconMenu
        image={require('../../assets/vector/Claim.png')}
        title="Claim"
        onPress={() => moveTo('')}
      />
      <View style={{width: 70, height: 70, marginBottom: 5}} />
    </View>
  );
};

export default MenuForm;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 78,
    justifyContent: 'center',
    marginVertical: 50,
  },
});
