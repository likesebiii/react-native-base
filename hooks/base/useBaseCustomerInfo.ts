import React from 'react';
import Purchases, {
  CustomerInfo,
  CustomerInfoUpdateListener,
} from 'react-native-purchases';

const BASE_SUBSCRIPTION = 'plus';
const BASE_DEV_SUBSCRIPTION = 'dev';

const useBaseCustomerInfo = ({
  onChangeInfo,
}: {
  onChangeInfo?: (info: CustomerInfo) => void;
}) => {
  const [info, setInfo] = React.useState<CustomerInfo>();

  const infoListener: CustomerInfoUpdateListener = React.useCallback(
    (info: CustomerInfo) => {
      onChangeInfo?.(info);
      setInfo(info);
    },
    [],
  );

  React.useEffect(() => {
    Purchases.getCustomerInfo()
      .then((customerInfo) => {
        // Access latest customer info
        setInfo(customerInfo);
      })
      .catch((_) => {
        // Error fetching customer info
      });

    Purchases.addCustomerInfoUpdateListener(infoListener);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(infoListener);
    };
  }, []);

  return {
    info,
    entitlement: info?.entitlements?.active[BASE_SUBSCRIPTION],
    developer: info?.entitlements?.active[BASE_DEV_SUBSCRIPTION],
  };
};

export default useBaseCustomerInfo;
