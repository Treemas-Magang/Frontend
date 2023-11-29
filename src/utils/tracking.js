/* eslint-disable prettier/prettier */
import BackgroundTimer from 'react-native-background-timer';

export const tracking = () => {
  BackgroundTimer.runBackgroundTimer(() => {
    console.log('hello')
  }, 3000);
  //rest of code will be performing for iOS on background too

  BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
};
