import { Analytics } from "@services";
import { Linking, Platform } from "react-native";
import useBaseBrowser from "./useBaseBrowser";

const URLS = {
  faq: "https://[application].notion.site/FAQ-About-Managing-Your-Subscription-ac6df9954f964837b17affaba6d3fcca",
  subscription: `itms-apps://apps.apple.com/account/subscriptions`,
  privacy: `https://docs.google.com/document/d/1uQfWwshDXSv11vtBHwgU7c4H0DGDLPy_ZxCA8ZRWmJk/edit`,
  terms:
    "https://docs.google.com/document/d/1DT_ukMdTWaIIepzN1Y9P6S8JlCaiEo-oQFiwg7IrGpA/edit?usp=sharing",
  mail: "mailto:hello@[application].io?subject=[application]%20Feedback",
};

const onAnalytics = (element: string) => {
  Analytics.log(
    "settingsTap",
    {
      element,
    },
    ["amplitude"]
  );
};

const useBaseBrowserActions = () => {
  const { openLink } = useBaseBrowser();

  const onCancelPress = () => {
    onAnalytics("cancel-subscription");
    if (Platform.OS === "ios") {
      Linking.openURL(URLS.subscription).catch((err) =>
        console.log("[Open AppStore Subscriptions] error: ", err)
      );
    } else {
      openLink(URLS.faq);
    }
  };

  const onContactUsPress = () => {
    onAnalytics("contact-us");
    Linking.openURL(URLS.mail);
  };

  const onPrivacyPress = () => {
    onAnalytics("privacy-policy");
    openLink(URLS.privacy);
  };

  const onFAQPress = () => {
    onAnalytics("faq");
    openLink(URLS.faq);
  };

  const onTermsPress = () => {
    onAnalytics("terms-of-service");
    openLink(URLS.terms);
  };

  return {
    onCancelPress,
    onContactUsPress,
    onPrivacyPress,
    onFAQPress,
    onTermsPress,
  };
};

export default useBaseBrowserActions;
