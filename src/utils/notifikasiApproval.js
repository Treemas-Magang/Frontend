/* eslint-disable prettier/prettier */
// import {Platform} from 'react-native';
// import PushNotification, {Importance} from 'react-native-push-notification';

// const configureNotificationsApproval = (
//   navigation,
//   screen,
//   id,
//   kategori,
//   notificationId,
// ) => {
//   PushNotification.configure({
//     onRegister: function (token) {
//       console.log('TOKEN:', token);
//     },
//     onNotification: function (notification) {
//       console.log('NOTIFICATION:', notification);

//       // Handle the notification click event
//       handleNotificationClick(
//         navigation,
//         screen,
//         id,
//         kategori,
//         notification.id,
//         notificationId,
//         notification.kategori
//       );
//     },
//     onAction: function (notification) {
//       console.log('ACTION:', notification.action);
//       console.log('NOTIFICATION:', notification);
//     },
//     onRegistrationError: function (err) {
//       console.error(err.message, err);
//     },
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: Platform.OS === 'ios',
//   });
// };

// const createNotificationChannelApproval = channel => {
//   PushNotification.createChannel({
//     channelId: channel,
//     channelName: 'My channel',
//     channelDescription: 'A channel to categorize your notifications',
//     playSound: false,
//     soundName: 'default',
//     importance: Importance.HIGH,
//     vibrate: true,
//   });
// };

// const sendNotificationApproval = (channel, title, body, notificationId, kategori) => {
//   PushNotification.localNotification({
//     channelId: channel,
//     title: title,
//     message: body,
//     id: notificationId, // Setiap notifikasi harus memiliki ID yang unik
//     kategori: kategori,
//     });
// };

// const handleNotificationClick = async (
//   navigation,
//   screen,
//   id,
//   kategori,
//   pushNotificationId,
//   notificationId,
//   notificationKategori
// ) => {
//   // Extract relevant data from the notification
//   const screenName = screen;
//   moveToScreen(
//     screenName,
//     navigation,
//     id,
//     kategori,
//     pushNotificationId,
//     notificationId,
//     notificationKategori,
//   );
// };

// const moveToScreen = (
//   screenName,
//   navigation,
//   id,
//   kategori,
//   pushNotificationId,
//   notificationId,
//   notificationKategori,
// ) => {
//   console.log('ini id : ', pushNotificationId, ' dengan kategori : ', kategori);
//   navigation.navigate(screenName, {
//     id: pushNotificationId,
//     kategori: notificationKategori,
//     pushNotificationId: pushNotificationId,
//     notificationId: notificationId,
//   });
// };

// export {
//   configureNotificationsApproval,
//   createNotificationChannelApproval,
//   sendNotificationApproval,
// };

/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const configureNotificationsApproval = (navigation) => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);


      // Handle the notification click event
      handleNotificationClick(navigation, notification.data.id, notification.data.kategori, notification.data.screen);
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

  const screenName = screen;
    moveToScreen(screenName, navigation, id, kategori);
  // Use navigation to move to the specified screen
};

const moveToScreen = (screenName, navigation, id, kategori) => {
  // Implement your navigation logic here to move to the specified screen
  // You can use React Navigation or any other navigation library you're using
  // Example using React Navigation:
    navigation.navigate(screenName, {id: id, kategori: kategori});

};

export {configureNotificationsApproval, createNotificationChannelApproval, sendNotificationApproval};
