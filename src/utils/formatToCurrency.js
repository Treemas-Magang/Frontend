/* eslint-disable prettier/prettier */
export const formatToCurrency = (amount) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
};
