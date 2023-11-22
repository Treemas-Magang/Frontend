import React from 'react';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

export const AlertNotificationSuccess = ({
  titleAlert,
  textBodyAlert,
  buttonAlert,
}) => {
  return (
    <AlertNotificationRoot>
      {Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: titleAlert,
        textBody: textBodyAlert,
        button: buttonAlert,
      })}
    </AlertNotificationRoot>
  );
};

export const AlertNotificationWarning = ({
  titleAlert,
  textBodyAlert,
  buttonAlert,
}) => {
  return (
    <AlertNotificationRoot>
      <AlertNotificationRoot>
        {Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: titleAlert,
          textBody: textBodyAlert,
          button: buttonAlert,
        })}
      </AlertNotificationRoot>
    </AlertNotificationRoot>
  );
};
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
