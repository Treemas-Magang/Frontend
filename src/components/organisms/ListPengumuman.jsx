import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import CardNotif from '../molecules/CardNotif';
import {Color} from '../../utils/color';

const ListPengumuman = () => {
  return (
    <View
      style={{backgroundColor: Color.primary, flex: 1, position: 'relative'}}>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>PENGUMUMAN</Text>
      <View style={styles.backgroundCardNotif}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
          <CardNotif />
        </ScrollView>
      </View>
    </View>
  );
};

export default ListPengumuman;

const styles = StyleSheet.create({
  backgroundCardNotif: {
    backgroundColor: Color.background,
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Color.text,
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
