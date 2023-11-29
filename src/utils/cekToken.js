/* eslint-disable prettier/prettier */
const { Alert, BackHandler } = require("react-native");
const { getDataFromSession } = require("./getDataSession");


const exit = () => {
  BackHandler.exitApp();
};

export const cekToken = () => {
    getDataFromSession('token')
    .then(token => {
        if (token === null) {
            Alert.alert(
              'Anda tidak memiliki token',
              'harap login',
              [{text: 'OK', onPress: () => exit()}],
            );
        }
    })
    .catch(error => console.log(error))
};
