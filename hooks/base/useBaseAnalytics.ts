import { Analytics } from '@services';
import React from 'react';

const useBaseAnalytics = ({ page }: { page?: string }) => {
  React.useEffect(() => {
    if (page) {
      Analytics.log('openPage', { page }, ['amplitude']);
    }
  }, []);
};

export default useBaseAnalytics;
