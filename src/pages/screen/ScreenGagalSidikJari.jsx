import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Color} from '../../utils/color';
import LottieView from 'lottie-react-native';
import {text} from '../../utils/text';

const ScreenGagalSidikJari = ({navigation}) => {
  const [cooldown, setCooldown] = useState(30);
  const [isFingerprintUsed, setIsFingerprintUsed] = useState(false);

  useEffect(() => {
    handleFingerprintUsage();
    let cooldownInterval;

    if (isFingerprintUsed) {
      cooldownInterval = setInterval(() => {
        if (cooldown > 0) {
          setCooldown(cooldown - 1);
        } else {
          clearInterval(cooldownInterval);
          setIsFingerprintUsed(false);
        }
      }, 1000);
    }
    if (cooldown === 0) {
      navigation.navigate('login');
    }
    return () => {
      clearInterval(cooldownInterval);
    };
  }, [cooldown, isFingerprintUsed]);

  const handleFingerprintUsage = () => {
    if (!isFingerprintUsed) {
      setIsFingerprintUsed(true);
      setCooldown(30);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.green,
      }}>
      <Image
        style={styles.VectorAtasKebalik}
        source={require('../../assets/vector/VectorAtasKebalik.png')}
      />
      <LottieView
        source={require('../../assets/animation/fingerprint.json')}
        autoPlay
        style={{width: '30%', height: '20%'}}></LottieView>
      <Text
        style={{
          fontFamily: text.semiBoldItalic,
          fontSize: 12,
          color: Color.red,
        }}>
        Terlalu banyak melakukan percobaan
      </Text>
      <Text
        style={{
          fontFamily: text.semiBoldItalic,
          fontSize: 18,
          color: Color.black,
        }}>
        Silahkan Tunggu{' '}
        <Text
          style={{
            fontFamily: text.semiBoldItalic,
            fontSize: 18,
            color: Color.red,
          }}>
          {cooldown}
        </Text>{' '}
        detik
      </Text>
      <Image
        style={styles.VectorBawah}
        source={require('../../assets/vector/VectorBawah.png')}
      />
    </View>
  );
};

export default ScreenGagalSidikJari;

const styles = StyleSheet.create({
  VectorAtasKebalik: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    width: '100%',
  },
  VectorBawah: {
    position: 'absolute',
    bottom: -75,
    zIndex: -1,
    width: '100%',
  },
});
