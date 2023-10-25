/* eslint-disable prettier/prettier */
export const getTanggalSekarang = () => {
  // Membuat objek tanggal
  const currentDate = new Date();

  // Mendapatkan tahun, bulan, tanggal, jam, menit, dan detik
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ingat, bulan dimulai dari 0 (Januari) hingga 11 (Desember)
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  // Mendapatkan nama harinya dalam bahasa Indonesia
  const daysOfWeek = [
    'minggu',
    'senin',
    'selasa',
    'rabu',
    'kamis',
    'jumat',
    'sabtu',
  ];
  const dayName = daysOfWeek[currentDate.getDay()];

  // Format tanggal dalam "yyyy-mm-dd" dan waktu dalam "hh:mm:ss"
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
    dayName: dayName,
  };
};

// Menggunakan fungsi
const {date, time, dayName} = getTanggalSekarang();
console.log('Tanggal:', date);
console.log('Waktu:', time);
console.log('Hari:', dayName);
