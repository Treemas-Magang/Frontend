/* eslint-disable prettier/prettier */
export const jamSekarang = () => {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    const menit = sekarang.getMinutes();
    const detik = sekarang.getSeconds();
    const waktuSekarang = `${jam}:${menit}:${detik}`;
    return waktuSekarang;
}