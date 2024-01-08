/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const configureNotificationsApproval = (
  navigation,
  screen,
  id,
  kategori,
  notificationId,
) => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: async function (notification) {
      console.log('NOTIFICATION ppp:', notification);
      console.log('kategorriii : ', notification.data.id);

      // Handle the notification click event
      await handleNotificationClick(
        navigation,
        notification.data.id,
        kategori,
        notification.data.screen,
      );
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION aaa:', notification);
      console.log('ini kategoriii ; ', notification.data.kategori);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
};

const createNotificationChannelApproval = channel => {
  PushNotification.createChannel(
    {
      channelId: channel,
      channelName: 'My channel',
      channelDescription: 'A channel to categorize your notifications',
      playSound: false,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

const sendNotificationApproval = (channel, title, body, id, kategori, screen) => {
  // console.log('ini kategori : ', kategori);
  PushNotification.localNotification({
    channelId: channel,
    title: title,
    message: body,
    userInfo: {
      id: id,
      kategori: kategori,
      screen: screen,
    },
    group: 'Approval',
  });

};


const handleNotificationClick = async (navigation, id, kategori, screen) => {
  // Extract relevant data from the notification
const id_pesan = id;
const kategoriPesan = kategori;
console.log('ini id pesan : ', id_pesan , kategoriPesan);

try {
  // Mengambil data dari AsyncStorage
  const dataFromStorage = await AsyncStorage.getItem('announcementData');

  if (dataFromStorage !== null) {
    // Jika data ditemukan, parse data JSON
    const parsedData = JSON.parse(dataFromStorage);

    // Cari item dengan id yang sesuai dalam data tersebut
    const itemToUpdate = parsedData.find(item => item.id === id_pesan);

    if (itemToUpdate) {
      // Jika item ditemukan, ubah status menjadi true
      itemToUpdate.status = true;

      // Simpan data yang telah diubah kembali ke AsyncStorage
      await AsyncStorage.setItem(
        'announcementData',
        JSON.stringify(parsedData),
      );
      console.log(
        `Status untuk ID ${id_pesan} berhasil diubah menjadi true di AsyncStorage`,
      );
    } else {
      // Item dengan id yang diberikan tidak ditemukan
      console.log(`Item dengan ID ${id_pesan} tidak ditemukan.`);
    }
  } else {
    // Data tidak ditemukan di AsyncStorage
    console.log('Data tidak ditemukan di AsyncStorage');
  }
} catch (error) {
  console.error('Gagal mengubah status di AsyncStorage:', error);
}
// Extract relevant data from the notification
const screenName = screen;

console.log('ini screen : ',screenName);
console.log('ini kategori dari notifikasi : ', kategoriPesan);
    moveToScreen(screenName, navigation, id, kategori);
  // Use navigation to move to the specified screen
};

const moveToScreen = (screenName, navigation, id, kategori) => {
  console.log('ini kategori dari notifikasi : ', kategori);
  // Implement your navigation logic here to move to the specified screen
  // You can use React Navigation or any other navigation library you're using
  // Example using React Navigation:
    console.log(kategori)
    // navigation.navigate(screenName, {id: id, kategori: kategori});

};

export {configureNotificationsApproval, createNotificationChannelApproval, sendNotificationApproval};
