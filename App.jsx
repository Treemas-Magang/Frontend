/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/routes/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/';
import {checkMockLocation} from './src/utils/checkMockLocation';
import {StatusBar} from 'react-native';

export default function App() {
  useEffect(() => {
    const fetchData = () => {
      checkMockLocation();
    };

    // Jalankan `fetchData` setiap 10 detik
    const cekMockLocation = setInterval(fetchData, 30000); // 30,000 milidetik = 30 detik
    return () => {
      clearInterval(cekMockLocation);
    };
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar animated={true} barStyle={'default'} />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
