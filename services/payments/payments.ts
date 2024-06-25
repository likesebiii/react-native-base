import { Platform } from "react-native";
import Purchases from "react-native-purchases";

const Payments = {
  init: () => {
    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: "[]" });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: "[]" });
    }
  },
} as const;

export default Payments;
