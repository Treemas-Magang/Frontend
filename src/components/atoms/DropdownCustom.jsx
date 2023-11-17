/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
const DropdownCustom = ({data, idTypeClaim, dataType}) => {
  const [type, setType] = useState('');
  const [idType, setIdtype] = useState('');
  const [dataClaim, setDataClaim] = useState([]);
  const handlePilihType = (keterangan, id) => {
    setType(keterangan);
    setIdtype(id);
  };
  data(type);
  idTypeClaim(idType);
useEffect(() => {
  setDataClaim(dataType);
}, [dataType]);

  return (
    <ScrollView style={{height: 200}}>
      {dataClaim?.length ? (
        dataClaim.map((claims, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePilihType(claims.keterangan, claims.idClaim)}
            style={styles.item}>
            <Text style={styles.tempatProject}>{claims.keterangan}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading . . .</Text>
      )}
      <View style={styles.batasBawah} />
    </ScrollView>
  );
};

export default DropdownCustom;

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderColor: Color.white,
    paddingVertical: 10,
  },
  tempatProject: {
    color: Color.white,
    fontFamily: text.regular,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  batasBawah: {
    marginVertical: 10,
  },
});
