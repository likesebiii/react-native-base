import { PurchasesEntitlementInfo } from 'react-native-purchases';

export const [application]_DEV_SUBSCRIPTION = 'dev';

export const isDevUser = ({
  activeEntitlements,
}: {
  activeEntitlements?: {
    [key: string]: PurchasesEntitlementInfo;
  };
}) => {
  return activeEntitlements?.[[application]_DEV_SUBSCRIPTION] !== undefined;
};
