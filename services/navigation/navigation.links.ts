import { LinkingOptions, PathConfigMap } from "@react-navigation/native";
import { NAVIGATION_PAGES_RECORD } from "./navigation.records";
import { TOPIC_CONTENT } from "@utils";
import { Linking, Platform } from "react-native";
import firebase from "@react-native-firebase/app";
import { Analytics } from "@services";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

type NavigationConfigType = Partial<typeof NAVIGATION_PAGES_RECORD>;
type ConfigurationType = {
  screens: PathConfigMap<NavigationConfigType>;
};

const onSuccessfulNotificationAnalytics = (
  destination: string,
  title?: string,
  body?: string,
  ios_subtitle?: string
) => {
  Analytics.log(
    "successfulNotification",
    {
      destination: destination ?? "",
      title: title ?? "",
      body: body ?? "",
      ios_subtitle: ios_subtitle ?? "",
    },
    ["amplitude"]
  );
};

const DEEPLINKS_CONFIG: ConfigurationType = {
  screens: {
    "fk.SettingsPage": "settings",
    "fk.TopicPage": {
      path: "topic-page/:type?/",
      parse: {
        type: (type) => {
          const keys = Object.keys(TOPIC_CONTENT);
          const types = keys.map((key) => TOPIC_CONTENT[key as never].key);

          if (types.includes(type as never)) {
            return type;
          } else {
            return TOPIC_CONTENT[0].key;
          }
        },
      },
    },
  },
};

export const LINKING: LinkingOptions<NavigationConfigType> = {
  prefixes: ["[application]://", "https://[application].io"],
  config: DEEPLINKS_CONFIG,
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const unsubscribeLinking = Linking.addEventListener("url", onReceiveURL);

    // Listen to firebase push notifications
    const unsubscribeNotification = firebase
      .messaging()
      .onNotificationOpenedApp((message) => {
        const url = message.data?.destination_path as string;

        // Handle analytics for opening the app
        onSuccessfulNotificationAnalytics(
          message.data?.destination_path as string,
          message?.notification?.title,
          message?.notification?.body,
          message?.notification?.ios?.subtitle
        );

        if (url) {
          // Call the listener to let React Navigation handle the URL
          listener(url);
        }
      });

    if (Platform.OS === "ios") {
      // Get initial notifications
      PushNotificationIOS.getInitialNotification().then((pushNotification) => {
        if (pushNotification) {
          const data = pushNotification?.getData();
          const url = data?.destination_path;

          // Handle analytics for opening the app
          onSuccessfulNotificationAnalytics(
            data?.destination_path,
            pushNotification?.getTitle() ?? data?.notification_title,
            pushNotification?.getMessage() as string
          );

          if (url) {
            // Call the listener to let React Navigation handle the URL
            listener(url);
          }
        }
      });
    }

    return () => {
      unsubscribeLinking.remove();
      unsubscribeNotification();
    };
  },
  getInitialURL: async () => {
    // This doesn't work
    // This code is left just as reference
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Check if there is an initial firebase notification
    const message = await firebase.messaging().getInitialNotification();
    const pushMessage = await PushNotificationIOS.getInitialNotification();
    const pushMessageData = pushMessage?.getData();

    const data = message?.data ?? pushMessageData;

    // Handle analytics for opening the app
    onSuccessfulNotificationAnalytics(
      data?.destination_path,
      message?.notification?.title ?? pushMessage?.getTitle(),
      message?.notification?.body ?? (pushMessage?.getMessage() as string),
      message?.notification?.ios?.subtitle
    );

    // Get deep link from data
    // if this is undefined, the app will open the default/home page
    return data?.destination_path as string;
  },
};
