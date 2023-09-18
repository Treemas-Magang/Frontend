import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromSession = async (key) => {
    try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.error('Gagal mengambil data dari sesi:', error);
    return null;
  }
}