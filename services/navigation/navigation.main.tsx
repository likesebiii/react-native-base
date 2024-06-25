import React from "react";
import * as Sentry from "@sentry/react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NAVIGATION_PAGES_RECORD,
  NavigationPageNameType,
} from "./navigation.records";
import { NavigationContainer } from "@react-navigation/native";
import { NAVIGATION_CONTROLLER } from "./navigation.controller";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import Animated, { enableLayoutAnimations } from "react-native-reanimated";
import * as Keychain from "react-native-keychain";
import { onLogout } from "./navigation.utils";
import { APIController, AuthAPI, Redux, Vortex } from "@services";
import { Image, LogBox, Platform } from "react-native";
import { LINKING } from "./navigation.links";
import { Analytics } from "@services";
import {
  BASE_API_ENDPOINT_TOKEN,
  BASE_TOP_PADDING,
  TOPIC_CONTENT_ACHIEVEMENTS,
  getUserAchievements,
} from "@utils";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import toastsConfig from "./navigation.toasts";

Animated.addWhitelistedNativeProps({ text: true });

const Stack = createNativeStackNavigator();

const IGNORED_LOGS = [
  "Non-serializable values were found in the navigation state",
  "source.uri",
];
LogBox.ignoreLogs(IGNORED_LOGS);

if (__DEV__) {
  const withoutIgnored =
    (logger: any) =>
    (...args: any) => {
      const output = args.join(" ");

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}

enableLayoutAnimations(true);

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

type NavigationPagesWrapperProps = {
  Component: React.ComponentType<any>;
} & NativeStackScreenProps<{ Default: {} }, "Default">;

const NavigationPagesWrapper: React.ComponentType<
  NavigationPagesWrapperProps
> = ({ Component, route, navigation, ...props }) => {
  return <Component {...props} {...route.params} />;
};

export const wrapComponentWithProps =
  (Component: React.ComponentType<any>) => (props: any) => {
    return <NavigationPagesWrapper Component={Component} {...props} />;
  };

const wrapComponent = (Component: React.ComponentType<any>) => {
  return wrapComponentWithProps(Component);
};

export const registerPagesStack = ({
  initialPageName,
  initialPage,
}: {
  initialPageName?: string;
  initialPage?: React.FC;
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    initNavigationAsync();
  }, []);

  return (
    <Provider store={Redux as any}>
      <NavigationContainer
        ref={NAVIGATION_CONTROLLER.ref}
        onReady={() => {
          routingInstrumentation.registerNavigationContainer(
            NAVIGATION_CONTROLLER.ref
          );
          // Notify that the navigation is ready
          // to be able to add links
          setReady(true);
        }}
        linking={ready ? LINKING : undefined}
      >
        <Stack.Navigator initialRouteName={initialPageName ?? "fk.SplashPage"}>
          {initialPage && initialPageName ? (
            <Stack.Screen
              name={initialPageName}
              component={initialPage}
              options={{ headerShown: false }}
            />
          ) : undefined}
          {Object.keys(NAVIGATION_PAGES_RECORD).map((pageName) => {
            const component = wrapComponent(
              NAVIGATION_PAGES_RECORD[pageName as NavigationPageNameType]
            );

            return (
              <Stack.Screen
                name={pageName}
                component={component}
                key={pageName}
                options={{
                  presentation:
                    pageName.includes("Drawer") || pageName.includes("Alert")
                      ? "containedTransparentModal"
                      : undefined,
                  headerShown: false,
                  animation: "fade",
                  gestureEnabled:
                    pageName.includes("Drawer") ||
                    pageName.includes("Alert") ||
                    pageName === "fk.SetupPage"
                      ? false
                      : true,
                }}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={toastsConfig}
        position="top"
        topOffset={BASE_TOP_PADDING - 16}
      />
    </Provider>
  );
};

const prefetch = (uris: string[], start: number) => {
  const uri = uris[start];

  Image.prefetch(uri).then(() => {
    if (start + 2 <= uris.length) {
      prefetch(uris, start + 1);
    }
  });
};

const prefetchAll = (uris: string[]) => {
  const imagePrefetch: Promise<boolean>[] = [];

  uris.forEach((uri) => imagePrefetch.push(Image.prefetch(uri)));

  if (Platform.OS === "ios") {
    Promise.all(imagePrefetch);
  } else {
    FastImage.preload(
      uris.map((url) => {
        return { uri: url };
      })
    );
  }
};

const preloadImages = () => {
  // Prefetch for onboarding
  Image.prefetch(
    `https://[application].s3.amazonaws.com/achievements/webp-compressed-characters/${TOPIC_CONTENT_ACHIEVEMENTS[11].image}.webp`
  );
  Image.prefetch(
    `https://[application].s3.amazonaws.com/achievements/webp-compressed-characters/${TOPIC_CONTENT_ACHIEVEMENTS[8].image}.webp`
  );

  const imageLinks = getUserAchievements({})
    // The limit should be removed if the battle is turned on
    .slice(0, 30)
    .map((item) => {
      return `https://[application].s3.amazonaws.com/achievements/webp-compressed-characters/${item.image}.webp`;
    });

  prefetchAll(imageLinks);
};

const initNavigationAsync = async () => {
  preloadImages();

  const onLoginSuccess = () => {
    NAVIGATION_CONTROLLER.setRoot("fk.RootPage");
  };

  const onLoginFailed = () => {
    NAVIGATION_CONTROLLER.setRoot("fk.WelcomePage");
  };

  try {
    const credentials = await Keychain.getGenericPassword();
    let token = APIController.getAuthToken();

    if (
      credentials &&
      credentials.username === "token" &&
      credentials.password !== token
    ) {
      APIController.setAuthToken(credentials.password);

      if (token === undefined) {
        token = credentials.password;
      }
    }

    if (Vortex.getObject("user-vortex").setup.loggedAsNSI) {
      onLoginSuccess();
    } else if (token && token !== BASE_API_ENDPOINT_TOKEN) {
      Redux.dispatchThunk("current", "loginThunk", {
        onSuccess: onLoginSuccess,
      });
    } else if (credentials && credentials.username !== "token") {
      AuthAPI.login(credentials.username, credentials.password)
        .then((response) => {
          Redux.dispatchThunk("current", "loginThunk", {
            token: response.access_token,
            refreshToken: response.refresh_token,
            onSuccess: onLoginSuccess,
          });
        })
        .catch((error) => {
          console.log(
            "[navigation]",
            error,
            credentials.username,
            credentials.password
          );

          Sentry.captureException(error, {
            level: "error",
          });
          onLogout();
        });
    } else {
      onLoginFailed();
    }
  } catch (error) {
    onLoginFailed();
    Analytics.log(
      "tokenError",
      {
        type: "sign-in",
        error: JSON.stringify(error),
      },
      ["amplitude"]
    );
    Sentry.captureException(error, { level: "error" });
  }
};
