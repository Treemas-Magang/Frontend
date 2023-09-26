import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

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
      setCooldown(30); // Set cooldown ke 30 detik (sesuaikan dengan kebutuhan Anda)
    }
  };

  return (
    <View>
      <Text>Cooldown Timer: {cooldown} detik</Text>
    </View>
  );
};

export default ScreenGagalSidikJari;
