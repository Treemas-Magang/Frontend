/* eslint-disable prettier/prettier */
export function formatTanggal(inputTanggal) {
  const [tahun, bulan, hari] = inputTanggal.split('-').map(Number);

  // Menambahkan '0' di depan bulan atau hari jika hanya satu digit
  const formattedBulan = bulan < 10 ? `0${bulan}` : bulan.toString();
  const formattedHari = hari < 10 ? `0${hari}` : hari.toString();

  return `${tahun}-${formattedBulan}-${formattedHari}`;
}
