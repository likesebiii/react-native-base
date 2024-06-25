import { Platform } from 'react-native';
import * as TrackingTransparency from 'react-native-tracking-transparency';
import * as FBSDK from 'react-native-fbsdk-next';
import { Amplitude } from '@amplitude/react-native';
import { isOverIOS145 } from '@utils';
import React from 'react';
import { MMKVStorage, Redux } from '@services';

const ROOT_REQUEST_TRACKING_TIME = 4500;

const useRootTracking = () => {
  const storeInformation = React.useCallback(() => {
    const storageKey = `track_${
      Platform.OS === 'ios' ? 'idfa' : 'aaid'
    }` as any;

    const { id } = Redux.select('current', 'currentUser', 'id');

    if (id || id === MMKVStorage.getValue(storageKey)) {
      return;
    }

    FBSDK.AppEventsLogger.getAdvertiserID().then((id) => {
      if (!!id) {
        Amplitude.getInstance().setUserProperties({
          track_status: 'authorized',
        });
        MMKVStorage.setValue(storageKey, id ?? '-');
      }
    });
  }, []);

  const requestTracking = React.useCallback(async () => {
    const { id } = Redux.select('current', 'currentUser', 'id');

    TrackingTransparency.requestTrackingPermission().then((trackingStatus) => {
      if (id === undefined) {
        return;
      }

      Amplitude.getInstance().setUserProperties({
        ios_track_idfa_status: trackingStatus,
      });
      if (trackingStatus === 'authorized') {
        FBSDK.Settings.setAdvertiserTrackingEnabled(true);
        storeInformation();
      }
    });
  }, []);

  React.useEffect(() => {
    const storeState = Redux.getState();

    setTimeout(() => {
      if (Platform.OS === 'android') {
        if (storeState.current.user) {
          storeInformation();
        }
      } else if (Platform.OS === 'ios') {
        const isOver145 = isOverIOS145();

        switch (!!storeState.current.user) {
          case true:
            if (!isOver145) {
              storeInformation();
            } else {
              TrackingTransparency.getTrackingStatus()
                .then((status) => {
                  if (status === 'not-determined') {
                    requestTracking();
                  } else if (status === 'authorized') {
                    storeInformation();
                  }
                })
                .catch(() => {
                  console.log('[useRootTracking] error: 1');
                });
            }
            break;
          case false:
            if (isOver145) {
              TrackingTransparency.getTrackingStatus()
                .then((status) => {
                  if (status === 'not-determined') {
                    requestTracking();
                  }
                })
                .catch(() => {
                  console.log('[useRootTracking] error: 2');
                });
            }
            break;
          default:
            break;
        }
      }
    }, ROOT_REQUEST_TRACKING_TIME);
  }, []);
};

export default useRootTracking;
