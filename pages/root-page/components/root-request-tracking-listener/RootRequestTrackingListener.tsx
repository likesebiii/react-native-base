import { useRootTracking } from '@hooks';
import React from 'react';

interface RootRequestTrackingListenerProps {}

const RootRequestTrackingListener: React.FC<RootRequestTrackingListenerProps> =
  ({}) => {
    useRootTracking();

    return null;
  };

export default RootRequestTrackingListener;
