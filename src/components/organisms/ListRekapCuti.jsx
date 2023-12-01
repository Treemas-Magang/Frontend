/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ButtonBack from '../atoms/ButtonBack';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CardRekapCuti from '../molecules/CardRekapCuti';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasBesar from '../atoms/VectorAtasBesar';

const ListRekapCuti = ({navigation}) => {
  const [rekCuti, setRekCuti] = useState([
    {
      nmTempat: 'Purwokerto',
      tglAwal: '02-03-2021',
      tglAkhir: '10-03-2021',
      tglMasuk: '11-03-2021',
      jmlhHari: '1',
      jmlhCutiBersama: '1',
      jmlhCutiKhusus: '1',
      keterangan: 'Back to Home in Kampung',
      catDisetujui: 'bawa oleh-oleh',
      tglDisetujui: '05-03-2021',
      disetujuiOleh: 'Pak Dede',
      status: 'disetujui',
    },
    {
      nmTempat: 'Purwokerto',
      tglAwal: '02-03-2021',
      tglAkhir: '10-03-2021',
      tglMasuk: '11-03-2021',
      jmlhHari: '1',
      jmlhCutiBersama: '1',
      jmlhCutiKhusus: '1',
      keterangan: 'Back to Home in Kampung',
      catDisetujui: 'bawa oleh-oleh',
      tglDisetujui: '05-03-2021',
      disetujuiOleh: 'Pak Dede',
      status: 'menunggu',
    },
    {
      nmTempat: 'Purwokerto',
      tglAwal: '02-03-2021',
      tglAkhir: '10-03-2021',
      tglMasuk: '11-03-2021',
      jmlhHari: '1',
      jmlhCutiBersama: '1',
      jmlhCutiKhusus: '1',
      keterangan: 'Back to Home in Kampung',
      catDisetujui: 'bawa oleh-oleh',
      tglDisetujui: '05-03-2021',
      disetujuiOleh: 'Pak Dede',
      status: 'ditolak',
    },
  ]);
  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <View style={styles.wrapKeteranganCuti}>
        <View
          style={{
            width: wp('100%'),
            height: hp('30%'),
            justifyContent: 'center',
          }}>
          <Text style={styles.Judul}>Keterangan Cuti</Text>
        </View>
      </View>
      <View style={styles.wrapCardRekapCuti}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {rekCuti.map((cuti, index) => (
            <View key={index}>
              <CardRekapCuti
                nmTempat={cuti.nmTempat}
                tanggalAwal={cuti.tglAwal}
                tanggalAkhir={cuti.tglAkhir}
                tanggalMasuk={cuti.tglMasuk}
                jmlhHari={cuti.jmlhHari}
                jmlhCutiBersama={cuti.jmlhCutiBersama}
                jmlhCutiKhusus={cuti.jmlhCutiKhusus}
                keterangan={cuti.keterangan}
                catDisetujui={cuti.catDisetujui}
                tglDisetujui={cuti.tglDisetujui}
                disetujuiOleh={cuti.disetujuiOleh}
                status={
                  cuti.status === 'disetujui'
                    ? 'disetujui'
                    : cuti.status === 'menunggu'
                    ? 'menunggu'
                    : cuti.status === 'ditolak'
                    ? 'ditolak'
                    : ''
                }
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListRekapCuti;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapKeteranganCuti: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardRekapCuti: {
    flex: 6,
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    backgroundColor: Color.cardSakit,
    borderRadius: 15,
  },
});
