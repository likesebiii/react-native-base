import { Analytics } from '@services';
import { PaywallLocationType } from '@types';
import React from 'react';
import Purchases, {
  CustomerInfo,
  CustomerInfoUpdateListener,
  PurchasesPackage,
} from 'react-native-purchases';
import Toast from 'react-native-toast-message';
import useBaseStateAndRef from './useBaseStateAndRef';

const useBasePurchase = ({ location }: { location?: PaywallLocationType }) => {
  const [state, setState] = React.useState<'normal' | 'success'>('normal');

  const [purchase, setPackages, packagesRef] = useBaseStateAndRef<
    PurchasesPackage[]
  >([]);

  const [isPurchasing, setIsPurchasing] = React.useState(false);

  React.useEffect(() => {
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        Analytics.log(
          'configurationError',
          {
            type: 'revenucat-get-offerings',
            error: e,
          },
          ['amplitude'],
        );
      }
    };

    getPackages();
  }, []);

  const onPurchase = async () => {
    setIsPurchasing(true);

    const purchasePackage = packagesRef.current[0];

    if (purchasePackage) {
      try {
        Analytics.log(
          'paywallAction',
          {
            location,
            action: 'view-subscription-drawer',
            type: purchasePackage.identifier,
          },
          ['amplitude'],
        );
        await Purchases.purchasePackage(purchasePackage);

        if (purchasePackage?.product?.introPrice?.price === 0) {
          Analytics.log(
            'startTrial',
            {
              location,
            },
            ['amplitude', 'firebase'],
          );
        }
      } catch (e: any) {
        if (!e?.userCancelled) {
          const message = e?.message ?? 'Unknown error';

          Analytics.log(
            'subscribeError',
            {
              location,
              type: purchasePackage.identifier,
              message,
              error: JSON.stringify(e),
            },
            ['amplitude'],
          );

          Toast.show({
            type: 'error',
            text1: 'Subscribe error.',
            text2: JSON.stringify(e),
            swipeable: false,
          });
        } else {
          Analytics.log(
            'paywallAction',
            {
              location,
              type: purchasePackage.identifier,
              action: 'cancel-subscription-drawer',
            },
            ['amplitude'],
          );
        }
      } finally {
        setIsPurchasing(false);
      }
    } else {
      Analytics.log(
        'subscribeError',
        { location, error: 'subscriptions-not-fetched' },
        ['amplitude'],
      );
    }
  };

  const infoListener: CustomerInfoUpdateListener = React.useCallback(
    (info: CustomerInfo) => {
      if (info.entitlements.active['plus'] !== undefined) {
        Analytics.log('subscribeSuccess', { location }, ['amplitude']);
        setState('success');
      }
    },
    [],
  );

  React.useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(infoListener);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(infoListener);
    };
  }, []);

  return { purchase, state, isPurchasing, onPurchase };
};

export default useBasePurchase;
