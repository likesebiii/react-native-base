import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { ThemeType } from "@types";

export const BASE_BLURHASH: Record<ThemeType, string> = {
  light: "L0EMLDxufQxu-;fQfQfQfQfQfQfQ",
  dark: "L0EMLDxufQxu-;fQfQfQfQfQfQfQ",
};
export const BASE_API_ENDPOINT = "[base_api_endpoint]";
export const BASE_API_ENDPOINT_TOKEN = "[base_api_endpoint_token]";
export const BASE_API_OAUTH_TOKEN = "[base_api_oauth_token]";
export const BASE_BOTTOM_BAR_HEIGHT = 50 + Math.max(getBottomSpace(), 12);
export const BASE_STATUS_BAR_HEIGHT = Math.max(getStatusBarHeight(), 24) - 16;
export const BASE_HEADER_HEIGHT = BASE_STATUS_BAR_HEIGHT + 80;

export const NAVIGATION_TABS = ["feed", "map", "game"];
export const ACTIVE_OPACITY = 0.65;

export const WEEK_DAYS: Record<number, { normal: string }> = {
  0: { normal: "sunday" },
  1: { normal: "monday" },
  2: { normal: "tuesday" },
  3: { normal: "wednesday" },
  4: { normal: "thursday" },
  5: { normal: "friday" },
  6: { normal: "saturday" },
};

export const MONTHS: Record<number, { normal: string; short: string }> = {
  0: { normal: "January", short: "Jan" },
  1: { normal: "February", short: "Feb" },
  2: { normal: "March", short: "Mar" },
  3: { normal: "April", short: "Apr" },
  4: { normal: "May", short: "May" },
  5: { normal: "June", short: "Jun" },
  6: { normal: "July", short: "Jul" },
  7: { normal: "August", short: "Aug" },
  8: { normal: "September", short: "Sep" },
  9: { normal: "October", short: "Oct" },
  10: { normal: "November", short: "Nov" },
  11: { normal: "December", short: "Dec" },
};
