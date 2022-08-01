import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function schedulePushNotification(
  title: string,
  body: string,
  data: object | undefined = undefined,
  delay = 2
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      ...(data && ({ data } as object)),
      sound: "default",
    },
    trigger: { seconds: delay },
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    //alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export function getAnalyticsFromData(
  data: any,
  title: string,
  afterTitle: string = ""
) {
  const today = new Date();
  return {
    [`${title}Today`]:
      data[
        `${title}${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()}${afterTitle}`
      ],
    [`${title}Month`]:
      data[
        `${title}${today.getMonth() + 1}-${today.getFullYear()}${afterTitle}`
      ],
    [`${title}Year`]: data[`${title}${today.getFullYear()}${afterTitle}`],
  };
}
