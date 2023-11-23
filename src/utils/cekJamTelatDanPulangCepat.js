/* eslint-disable prettier/prettier */
export const cekTelatMasuk = batasWaktu => {
  // Mendapatkan waktu saat ini dengan zona waktu lokal
  let waktuSaatIni = new Date();
  let jamSaatIni = waktuSaatIni.getHours();
  let menitSaatIni = waktuSaatIni.getMinutes();
  let detikSaatIni = waktuSaatIni.getSeconds();

  // Mendapatkan jam, menit, dan detik dari batas waktu
  let jamBanding = parseInt(batasWaktu.substring(0, 2));
  let menitBanding = parseInt(batasWaktu.substring(3, 5));
  let detikBanding = parseInt(batasWaktu.substring(6, 8));

  // Membandingkan waktu
  if (
    jamSaatIni > jamBanding ||
    (jamSaatIni === jamBanding &&
      (menitSaatIni > menitBanding ||
        (menitSaatIni === menitBanding && detikSaatIni > detikBanding)))
  ) {
    console.log('batas waktu : ', batasWaktu);
    return true;
  } else {
    console.log('batas waktu : ', batasWaktu);
    return false;
  }
};
// // Menggunakan fungsi
// if (cekTelatMasuk()) {
//   console.log('anda telat masuk');
// } else {
//   console.log('anda belum telat masuk');
// }
