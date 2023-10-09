/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardListAbsen from '../molecules/CardListAbsen';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';

const ListAbsen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <View style={styles.wrapAbsen}>
        <Text style={styles.judul}>ABSEN</Text>
      </View>
      <View style={styles.wrapCardAbsen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardListAbsen navigation={navigation} />
          <CardListAbsen navigation={navigation} />
          <CardListAbsen navigation={navigation} />
          <CardListAbsen navigation={navigation} />
          <CardListAbsen navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ListAbsen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapAbsen: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardAbsen: {
    flex: 6,
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
  },
});
