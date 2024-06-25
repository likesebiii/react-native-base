import { colors } from '@theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Toast from 'react-native-toast-message';
import useBaseAspect from './useBaseAspect';

const useBaseBrowser = () => {
  const { theme } = useBaseAspect(undefined);

  const openLink = (url: string) => {
    try {
      // Source: https://github.com/proyecto26/react-native-inappbrowser
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: colors[theme].main.primaryBackground,
        preferredControlTintColor: colors[theme].text.primary,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed opening browser.',
        text2: JSON.stringify(error),
        swipeable: false,
      });
    }
  };

  return { openLink };
};

export default useBaseBrowser;
