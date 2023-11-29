/* eslint-disable prettier/prettier */
// const haversine = require('haversine-distance');
export function hitungJarak(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters (6371 km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  // Contoh koordinat titik pertama
  // const point1 = {latitude: lat1, longitude: lon1};

  // Contoh koordinat titik kedua
  // const point2 = {latitude: lat2, longitude: lon2};

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters

  // Menggunakan library untuk menghitung jarak
  // const distance = haversine(point1, point2);
  console.log('ini hitung jarak : ', Math.round(distance));
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
