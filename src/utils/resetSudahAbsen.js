/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable radix */
import AsyncStorage from "@react-native-async-storage/async-storage";

export const resetSudahAbsen = async () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  try {
    // Mengecek apakah data sudah diset atau belum
    const storedDay = await AsyncStorage.getItem('lastCheckedDay');

    // Jika data sudah diset dan berbeda dengan hari saat ini, maka update nilai "isAbsen"
    if (storedDay && parseInt(storedDay) !== currentDay) {
      await AsyncStorage.setItem('sudah_absen', 'false');
      await AsyncStorage.setItem('perbarui_absen', 'false');
      console.log('Nilai sudah_absen diubah menjadi false pada hari baru.');
    }
    console.log('Nilai sudah_absen true');
    // Update nilai hari terakhir yang dicek
    await AsyncStorage.setItem('lastCheckedDay', currentDay.toString());
  } catch (error) {
    console.error('Gagal mengupdate nilai isAbsen:', error);
  }
};
