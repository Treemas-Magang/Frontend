/* eslint-disable prettier/prettier */
export const cekTglAkhirCutiSpesial = (tglSekarang, jumlahHari) => {
  const today = new Date(tglSekarang);
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + jumlahHari);

  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
