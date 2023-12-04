/* eslint-disable prettier/prettier */

import React from 'react';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

/**
 * Komponen AlertNotificationSuccess digunakan untuk menampilkan notifikasi sukses.
 *
 * @param {string} titleAlert - Judul notifikasi.
 * @param {string} textBodyAlert - Isi teks notifikasi.
 * @param {string} buttonAlert - Teks tombol notifikasi.
 * @param {function} onPress - Fungsi yang akan dipanggil ketika tombol notifikasi ditekan.
 * @returns {JSX.Element} - Komponen React untuk menampilkan notifikasi sukses.
 */
export const AlertNotificationSuccess = ({
  titleAlert,
  textBodyAlert,
  buttonAlert,
  onPress,
}) => {
  return (
    <AlertNotificationRoot>
      {Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: titleAlert,
        textBody: textBodyAlert,
        button: buttonAlert,
        onPressButton: onPress,
        onHide: onPress,
      })}
    </AlertNotificationRoot>
  );
};

/**
 * Komponen AlertNotificationWarning digunakan untuk menampilkan notifikasi peringatan.
 *
 * @param {string} titleAlert - Judul notifikasi.
 * @param {string} textBodyAlert - Isi teks notifikasi.
 * @param {string} buttonAlert - Teks tombol notifikasi.
 * @returns {JSX.Element} - Komponen React untuk menampilkan notifikasi peringatan.
 */
export const AlertNotificationWarning = ({
  titleAlert,
  textBodyAlert,
  buttonAlert,
}) => {
  return (
    <AlertNotificationRoot>
      {Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: titleAlert,
        textBody: textBodyAlert,
        button: buttonAlert,
      })}
    </AlertNotificationRoot>
  );
};

/**
 * Komponen AlertNotificationDanger digunakan untuk menampilkan notifikasi berbahaya.
 *
 * @param {string} titleAlert - Judul notifikasi.
 * @param {string} textBodyAlert - Isi teks notifikasi.
 * @param {string} buttonAlert - Teks tombol notifikasi.
 * @returns {JSX.Element} - Komponen React untuk menampilkan notifikasi berbahaya.
 */
export const AlertNotificationDanger = ({
  titleAlert,
  textBodyAlert,
  buttonAlert,
}) => {
  return (
    <AlertNotificationRoot>
      {Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: titleAlert,
        textBody: textBodyAlert,
        button: buttonAlert,
      })}
    </AlertNotificationRoot>
  );
};
