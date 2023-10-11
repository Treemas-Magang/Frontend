// /* eslint-disable prettier/prettier */
// import jwt from 'jsonwebtoken';
// import { getDataFromSession } from './getDataSession';
// import dotenv from 'dotenv';
// // import { SECRET_KEY } from 'react-native-dotenv';

// dotenv.config();

// let token = null;

// getDataFromSession('token')
//   .then(datatoken => {
//     if (datatoken !== null) {
//       token = datatoken;
//     } else {
//       console.log('Token tidak ditemukan di session.');
//     }
//   })
//   .catch(error => {
//     console.error('Terjadi kesalahan dalam getDataFromSession:', error);
//   });

// const secretKey = process.env.SECRET_KEY;

// export const decodeToken = () => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, secretKey, (error, decoded) => {
//       if (error) {
//         console.error('Gagal mendekode token:', error);
//         reject(error);
//       } else {
//         console.log('Token terdekripsi:', decoded);
//         // Di sini Anda dapat melakukan apa pun dengan data yang sudah terdekripsi.
//         resolve(decoded);
//       }
//     });
//   });
// };
