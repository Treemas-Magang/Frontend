/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CardRekapClaim = ({
  navigation,
  tanggal,
  type,
  keterangan,
  nominalClaim,
  image64,
}) => {
  let base64ImageData = null;
  if (image64 && image64.base64 && image64.fileSize) {
    base64ImageData = `data:image/jpeg;base64,${image64.base64}`;
    console.log('ini file size : ', image64.fileSize);
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  console.log('ini base64Image : ', base64ImageData);

  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
  };

  return (
    <View style={styles.CardRekapClaimStyle}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: text.semiBold,
            fontSize: 16,
            color: Color.black,
            textTransform: 'uppercase',
          }}>
          {tanggal}
        </Text>
      </View>
      <View style={styles.CardDalemReimburseStyle}>
        {image64 === null ? (
          <View style={styles.wrapImage}></View>
        ) : (
          <View style={styles.wrapImage}>
            <TouchableOpacity onPress={moveToPreview}>
              <FontAwesomeIcon icon={faImage} color={Color.green} size={40} />
            </TouchableOpacity>
          </View>
        )}
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
            paddingTop: 20,
          }}>
          Type
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>{type}</Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
          }}>
          Keterangan
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {keterangan}
        </Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
          }}>
          Nominal
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {formatToCurrency(nominalClaim)}
        </Text>
      </View>
    </View>
  );
};

export default CardRekapClaim;

const styles = StyleSheet.create({
  CardRekapClaimStyle: {
    backgroundColor: Color.green,
    width: wp('85%'),
    height: hp('35%'),
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemReimburseStyle: {
    backgroundColor: Color.white,
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  wrapImage: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    gap: 5,
    right: 5,
  },
});
