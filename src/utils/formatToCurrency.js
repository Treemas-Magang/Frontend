/* eslint-disable prettier/prettier */
export const formatToCurrency = amount => {
  // Menghilangkan dua nol di belakang koma terakhir
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount.replace(/\.00$/, '');
};
