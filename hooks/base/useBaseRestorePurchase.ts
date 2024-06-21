import { Vortex, Analytics } from "@services";
import Purchases from "react-native-purchases";
import Toast from "react-native-toast-message";

const useBaseRestorePurchase = () => {
  const onRestore = async () => {
    Analytics.log(
      "settingsTap",
      {
        element: "restore-subscription",
      },
      ["amplitude"]
    );

    try {
      const restore = await Purchases.restorePurchases();
      // Check restored customerInfo to see if entitlement is now active
      if (restore.entitlements.active["plus"] !== undefined) {
        Vortex.dispatch("user-vortex", "changeUserSubscription")("pro");
        Analytics.log(
          "changeUserSubscription",
          { type: "pro", from: "settings-page-restore" },
          ["firebase", "amplitude"]
        );

        Toast.show({
          type: "success",
          text1: "Subscription Successfully Restored.",
          text2: "Welcome Back to [application]+!",
          swipeable: false,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "No subscription found to restore.",
          text2: "Please verify your account details.",
          swipeable: false,
        });
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Unable to Restore Purchases.",
        text2: "Please try again later.",
        swipeable: false,
      });
    }
  };

  return { onRestore };
};

export default useBaseRestorePurchase;
