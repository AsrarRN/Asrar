import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import TabScreen from "./screens/TabScreen";
import { Image } from "react-native";
import { Rnicon } from "./assets/images";
import { normalize } from "./Common/Normalize";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const Stack = createNativeStackNavigator();

const MainRouteConfig = () => {
  // eslint-disable-next-line react/no-unstable-nested-components
  function Icon() {
    return (
      <Image
        source={Rnicon}
        style={{
          height: normalize(25),
          width: normalize(25),
        }}
      />
    );
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log("Authorization status:", authStatus);
    if (enabled) {
      const token = await messaging().getToken();
      getFcmToken();
      console.log("token => ", token);
    }
  }

  const getFcmToken = async () => {
    messaging().setAutoInitEnabled(true);

    const fcmToken = await messaging().getToken();
    console.log("===FCMToken===", fcmToken);

    messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground FCM message arrived!", remoteMessage);

      try {
        let res = remoteMessage.notification;
        let payload = remoteMessage.data;

        PushNotification.localNotification({
          channelId: "default-channel-id",
          autoCancel: true,
          vibrate: true,
          vibration: 300,
          invokeApp: true,
          /* iOS and Android properties */
          id: 1,
          title: res?.title,
          message: res?.body ? res?.body : "",
          number: 1,
          data: payload,
          userInfo: payload,
          actions: true,
        });
      } catch (error) {
        console.log("===Error===", error);
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("BackGround FCM message arrived!", remoteMessage);
    });
  };

  const createPushnotificationChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: `Default channel`, // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        playSound: true,
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const onRegistered = (deviceToken) => {};

  const onRegistrationError = (error) => {};

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
      Title:  ${notification.getTitle()};\n
      Subtitle:  ${notification.getSubtitle()};\n
      Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()};\n
      Notification is clicked: ${String(isClicked)}.`;
  };

  const onLocalNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;
  };

  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
    requestUserPermission();
    createPushnotificationChannel();

    if (Platform.OS === "ios") {
      PushNotificationIOS.addEventListener("register", onRegistered);
      PushNotificationIOS.addEventListener(
        "registrationError",
        onRegistrationError
      );
      PushNotificationIOS.addEventListener(
        "notification",
        onRemoteNotification
      );
      PushNotificationIOS.addEventListener(
        "localNotification",
        onLocalNotification
      );

      PushNotificationIOS.requestPermissions().then(
        (data) => {
          console.log("PushNotificationIOS.requestPermissions", data);
        },
        (data) => {
          console.log("PushNotificationIOS.requestPermissions failed", data);
        }
      );
    }

    return () => {
      if (Platform.OS === "ios") {
        PushNotificationIOS.removeEventListener("register");
        PushNotificationIOS.removeEventListener("registrationError");
        PushNotificationIOS.removeEventListener("notification");
        PushNotificationIOS.removeEventListener("localNotification");
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animationEnabled: true }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name={"Login"}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: () => <Icon />,
            headerTitleAlign: "center",
            //  we can also add the back arrow here
            headerBackVisible: false,
          }}
          name={"TabScreen"}
          component={TabScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouteConfig;
