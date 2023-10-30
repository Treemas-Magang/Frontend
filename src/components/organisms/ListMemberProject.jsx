/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasBesar from '../atoms/VectorAtasBesar';

const ListMemberProject = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={styles.listMember}>
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 10, right: 10}}
      />
      <VectorAtasBesar />
      <View style={{paddingVertical: 70}}></View>
      <View style={styles.wrapListMember}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text style={styles.judul}>MEMBER</Text>
          <Text style={styles.judul}>PROJECT</Text>
        </View>
        <View style={styles.wrapStatus}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardMasuk}]}
            />
            <Text>Hadir</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]}
            />
            <Text>Cuti</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[
                styles.simbolStatus,
                {backgroundColor: Color.cardTidakMasuk},
              ]}
            />
            <Text>Tidak masuk</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardSakit}]}
            />
            <Text>Sakit/izin</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('listMembers')}>
            <Text style={styles.Text}>BANK UOB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('listMembers')}>
            <Text style={styles.Text}>GRAHA TELKOMSIGMA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('listMembers')}>
            <Text style={styles.Text}>BANK PERMATA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('listMembers')}>
            <Text style={styles.Text}>MANDIRI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('listMembers')}>
            <Text style={styles.Text}>BANK OF TOKYO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardPilihProject}
            onPress={() => moveTo('listMembers')}>
            <Text style={styles.Text}>PT MITRA TRANSAKSI INDONESIA</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ListMemberProject;

const styles = StyleSheet.create({
  listMember: {
    backgroundColor: Color.green,
    width: '100%',
    height: '100%',
  },
  wrapListMember: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
    paddingVertical: 5,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 24,
    color: Color.blue,
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: 5,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
  },
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: 280,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
