import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonLoading from '../../components/atoms/ButtonLoading';

const ScreenCobaCheckBox = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.body}>
      <Text style={styles.text}>COBA</Text>
      {/* <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      /> */}
      <ButtonLoading />
    </View>
  );
};

export default ScreenCobaCheckBox;

const styles = StyleSheet.create({
  body: {
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontFamily: text.semiBoldItalic,
    fontSize: 26,
    textTransform: 'uppercase',
    color: Color.black,
  },
});
