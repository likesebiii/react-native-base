import { default as RateModule } from "react-native-rate";
import { AndroidMarket, IConfig } from "react-native-rate";

const Rate = {
  rate: (
    inApp?: boolean,
    callback?: (success: boolean, error: string) => void
  ) => {
    const config: IConfig = {
      AppleAppID: "6478592896",
      GooglePackageName: "com.axensis.[application]",
      OtherAndroidURL: "https://[application].io",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: inApp ?? true,
      openAppStoreIfInAppFails: false,
      fallbackPlatformURL: "https://[application].io",
    };

    RateModule.rate(config, callback);
  },
};

export default Rate;
