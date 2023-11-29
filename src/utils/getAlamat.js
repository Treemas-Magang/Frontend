/* eslint-disable prettier/prettier */
import axios from 'axios';

export const getAlamat = async (latitude, longitude, apiKey) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    );

    // Memastikan response.data.results tidak undefined dan memiliki setidaknya satu hasil
    if (response.data.results && response.data.results.length > 0) {
      const formattedAddress = response.data.results[0].formatted_address;
      return formattedAddress;
    } else {
      return 'Alamat tidak ditemukan';
    }
  } catch (error) {
    // Memeriksa apakah error.response tidak undefined sebelum mengakses propertinya
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }

    return 'Terjadi kesalahan';
  }
// try {
//     const response = await axios.get(
//   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
//     );

//     if (response.data.display_name) {
//         const formattedAddress = response.data.display_name;
//       return formattedAddress;
//     } else {
//       return 'Alamat tidak ditemukan';
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return 'Terjadi kesalahan';
//   }
};


// AIzaSyByMFGn8i353SjJL_H0_hEfTmpUPx3_lC8

