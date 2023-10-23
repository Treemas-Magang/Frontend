/* eslint-disable prettier/prettier */
// import axios from 'axios';

// export const getAlamat = async (latitude, longitude, apiKey) => {
// //   try {
// //     const response = await axios.get(
// //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
// //     );

// //     if (response.data.results.length > 0) {
// //       const addressComponents = response.data.results[0].address_components;
// //       const formattedAddress = response.data.results[0].formatted_address;

// //       return formattedAddress;
// //     } else {
// //       return 'Alamat tidak ditemukan';
// //     }
// //   } catch (error) {
// //     console.error('Error:', error);
// //     return 'Terjadi kesalahan';
// //   }
// try {
//     const response = await axios.get(
// //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
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
// };


// AIzaSyByMFGn8i353SjJL_H0_hEfTmpUPx3_lC8

