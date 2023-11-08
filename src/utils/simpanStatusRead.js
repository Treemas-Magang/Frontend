/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const simpanIdYgSudahDiBaca = async (id) => {
        try {
      // Ambil data yang sudah ada dari AsyncStorage
      const existingData = await AsyncStorage.getItem('selectedIds');
      let selectedIds = [];

      if (existingData) {
        // Jika data sudah ada, parse dan gunakan
        selectedIds = JSON.parse(existingData);
      }

      // Cek apakah ID sudah ada di dalam array
      if (!selectedIds.includes(id)) {
        // Jika belum ada, tambahkan ID ke dalam array
        selectedIds.push(id);

        // Simpan kembali array yang sudah diperbarui ke dalam AsyncStorage
        await AsyncStorage.setItem('selectedIds', JSON.stringify(selectedIds));
        console.log('ID berhasil disimpan ke AsyncStorage');
      } else {
        console.log('ID sudah ada di dalam array');
      }
    } catch (error) {
      console.error('Gagal menyimpan ID ke AsyncStorage:', error);
    }
};
