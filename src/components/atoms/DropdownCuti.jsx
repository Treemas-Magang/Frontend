/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
const DropdownCuti = ({data, idTypeCuti, dataType}) => {
  const [type, setType] = useState('');
  const [idType, setIdtype] = useState('');
  const [dataCuti, setDataCuti] = useState([]);

  useEffect(() => {
    data(type);
    idTypeCuti(idType);
  }, [type, idType, data, idTypeCuti]);
  const handlePilihType = (cutiDesc, id) => {
    setType(cutiDesc);
    setIdtype(id);
  };
  data(type);
  idTypeCuti(idType);
  useEffect(() => {
    setDataCuti(dataType);
  }, [dataType]);

  console.log(dataCuti);
  return (
    <ScrollView style={{height: 200}} nestedScrollEnabled={true}>
      {dataCuti?.length ? (
        dataCuti.map((cutis, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePilihType(cutis.cutiDesc, cutis.id)}
            style={styles.item}>
            <Text style={styles.tempatProject}>{cutis.cutiDesc}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading . . .</Text>
      )}
      <View style={styles.batasBawah} />
    </ScrollView>
  );
};

export default DropdownCuti;

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
