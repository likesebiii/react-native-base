import { useBaseCustomerInfo } from '@hooks';
import React from 'react';
import Purchases from 'react-native-purchases';
import { Redux, useSelectRedux, Vortex } from '@services';

interface RootProListenerProps {}

const RootProListener: React.FC<RootProListenerProps> = ({}) => {
  const { info } = useBaseCustomerInfo({});

  const { id } = useSelectRedux('current', 'currentUser', 'id');
  const changeSubscriptionTimer = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const storeState = Redux.getState();
    const email = storeState.current?.user?.email;
    const hasBeenSet = Vortex.getObject('user-vortex').pro.setUserDetails;

    if (info) {
      const initialPro = info.entitlements.active['plus'] !== undefined;

      if (hasBeenSet === false && email && id && id.trim().length > 0) {
        Purchases.logIn(id).finally(() => {
          Purchases.setEmail(Redux.getState().current?.user?.email ?? 'User');
          // Check if it was initially pro
          // Here we should automatically restore the subscription
          // if it's from NSI
          if (initialPro) {
            Purchases.syncPurchases();
          }
        });

        Vortex.dispatch('user-vortex', 'setPurchaseUserDetails')();
      }
    }
  }, [info, id]);

  React.useEffect(() => {
    if (info) {
      clearTimeout(changeSubscriptionTimer.current);
      changeSubscriptionTimer.current = setTimeout(() => {
        if (info.entitlements.active['plus'] !== undefined) {
          Vortex.dispatch('user-vortex', 'changeUserSubscription')('pro');
        } else {
          Vortex.dispatch('user-vortex', 'changeUserSubscription')('free');
        }
      }, 500);
    }
  }, [info]);

  return null;
};

export default RootProListener;
