import {
  CommonActions,
  NavigationContainerRefWithCurrent,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  NavigationPageToPropsType,
  NavigationPageNameType,
} from './navigation.records';

export const NAVIGATION_CONTROLLER: {
  debounce?: NodeJS.Timeout;
  ref: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
  navigate: <T extends NavigationPageNameType>(
    page: T,
    props: NavigationPageToPropsType<T>,
  ) => void;
  replace: <T extends NavigationPageNameType>(
    page: T,
    props: NavigationPageToPropsType<T>,
  ) => void;
  close: (onSuccess?: () => void) => void;
  setRoot: (root: 'fk.RootPage' | 'fk.WelcomePage') => void;
} = {
  ref: createNavigationContainerRef(),
  navigate: (page, props) => {
    if (
      NAVIGATION_CONTROLLER.ref.isReady() &&
      NAVIGATION_CONTROLLER.debounce === undefined
    ) {
      NAVIGATION_CONTROLLER.ref.dispatch(StackActions.push(page, props));
      console.log(
        `[NAVIGATION_CONTROLLER] Navigate:${page} ${JSON.stringify(
          props,
          (_: string, value: any) => {
            if (typeof value === 'function') {
              return 'function';
            } else {
              return value;
            }
          },
        )}`,
      );

      clearTimeout(NAVIGATION_CONTROLLER.debounce);
      NAVIGATION_CONTROLLER.debounce = setTimeout(() => {
        clearTimeout(NAVIGATION_CONTROLLER.debounce);
        NAVIGATION_CONTROLLER.debounce = undefined;
      }, 1000);
    }
  },
  replace: (page, props) => {
    if (NAVIGATION_CONTROLLER.ref.isReady()) {
      NAVIGATION_CONTROLLER.ref.dispatch(StackActions.replace(page, props));
      console.log(
        `[NAVIGATION_CONTROLLER] Replace:${page} ${JSON.stringify(
          props,
          (_: string, value: any) => {
            if (typeof value === 'function') {
              return 'function';
            } else {
              return value;
            }
          },
        )}`,
      );
    }
  },
  close: (onSuccess?: () => void) => {
    if (NAVIGATION_CONTROLLER.ref.canGoBack()) {
      NAVIGATION_CONTROLLER.ref.goBack();

      setTimeout(() => {
        onSuccess?.();
      });
    } else {
      setTimeout(() => {
        onSuccess?.();
      });
    }
  },
  setRoot: (root: 'fk.RootPage' | 'fk.WelcomePage') => {
    NAVIGATION_CONTROLLER.ref.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: root }],
      }),
    );
  },
};
