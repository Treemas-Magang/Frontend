import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const DetailPengumuman = ({navigation}) => {
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <Text style={styles.Judul}>PENGUMUMAN</Text>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <View style={styles.backgroundCardNotif}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
              textAlign: 'center',
              color: Color.blue,
            }}>
            Jam Kerja Selama Ramadhan
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              textAlign: 'justify',
              width: 320,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem ipsum dolor, sit
            amet consectetur adipisicing elit.
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              width: 320,
            }}>
            Regards,
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              width: 320,
            }}>
            HR Division
          </Text>
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../../assets/icons/logo.png')}
            style={{
              width: 200,
              height: 107,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailPengumuman;

const styles = StyleSheet.create({
  Judul: {
    textAlign: 'center',
    marginVertical: 80,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Color.blue,
  },
  backgroundCardNotif: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    gap: 8,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
