import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonAction from '../atoms/ButtonAction';

const DetailTimesheetUpdate = ({navigation}) => {
  const moveToUpdateTimesheet = () => {
    // navigation.navigate('formUpdateTimesheet');
    console.log('Tombol berhasil ditekan');
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>DETAIL TIMESHEET</Text>
      <View style={styles.backgroundCardTimesheet}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Hari
            </Text>
            <Text>Senin</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Tanggal
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Lokasi
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Keterangan
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Jam Masuk
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Jam Keluar
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Reguler Hours
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Overtime
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
          <View>
            <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
              Total Jam Kerja
            </Text>
            <Text>08-11-2021</Text>
          </View>
        </ScrollView>
        <View style={styles.catatanKerja}>
          <ButtonAction
            onPress={() => moveToUpdateTimesheet()}
            title="Update"
          />
        </View>
      </View>
    </View>
  );
};

export default DetailTimesheetUpdate;

const styles = StyleSheet.create({
  backgroundCardTimesheet: {
    backgroundColor: Color.white,
    paddingTop: 50,
    paddingHorizontal: 29,
    flex: 1,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -50,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Color.blue,
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  catatanKerja: {
    backgroundColor: Color.white,
    padding: 20,
    margin: 8,
    alignItems: 'center',
  },
});
