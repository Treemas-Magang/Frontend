/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const configureNotifications = (navigation) => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // Handle the notification click event
      handleNotificationClick(navigation, notification.data.id, notification.data.screen);
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
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

const createNotificationChannel = channel => {
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

const sendNotification = (channel, title, body, id, screen) => {
  PushNotification.localNotification({
    channelId: channel,
    title: title,
    message: body,
    userInfo: {
      id: id,
      screen: screen,
    },
    group: 'announcement',
  });

};



const handleNotificationClick = async (navigation, id, screen) => {
  const id_pesan = id;
  console.log('ini id pesan : ', id_pesan);
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
  console.log(screenName)
    moveToScreen(screenName, navigation, id);
  // Use navigation to move to the specified screen
};

const moveToScreen = (screenName, navigation, id) => {
  // Implement your navigation logic here to move to the specified screen
  // You can use React Navigation or any other navigation library you're using

    navigation.navigate(screenName, {id: id});
};

export {configureNotifications, createNotificationChannel, sendNotification};
