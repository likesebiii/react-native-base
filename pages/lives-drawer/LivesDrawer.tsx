import React from 'react';
import { useBaseAnalytics, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { PageProps } from 'templates/utils';
import Drawer from 'templates/drawer/Drawer';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { LIVES_TIMEOUT } from '@utils';
import LivesInfoContent from './components/lives-info-content/LivesInfoContent';
import LivesBlockingContent from './components/lives-blocking-content/LivesBlockingContent';
import { useSelectVortex } from '@services';

export type LivesDrawerProps = {
  type?: 'info' | 'blocking';
};

const LivesDrawer: React.FC<LivesDrawerProps & PageProps> = ({
  type = 'info',
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);
  const isPro = useSelectVortex('user-vortex', 'selectUserSubscriptionType');

  const {
    date = new Date(Date.now() + LIVES_TIMEOUT[isPro] * 1000)
      .toISOString()
      .slice(0, -1),
    count: lives,
  } = useSelectVortex('user-vortex', (item) => item.lives);

  const onClose = () => {
    NAVIGATION_CONTROLLER.close();
  };

  useBaseAnalytics({ page: 'lives-drawer' });

  return (
    <Drawer
      onClose={onClose}
      scrollable={screenHeight < 670 && type === 'blocking'}
      bottomSheetProps={{
        backgroundStyle: styles.modalStyle,
        onClose: onClose,
        enablePanDownToClose: true,
      }}>
      {type === 'info' ? (
        <LivesInfoContent date={date} lives={lives} onClose={onClose} />
      ) : (
        <LivesBlockingContent date={date} lives={lives} />
      )}
    </Drawer>
  );
};

export default LivesDrawer;
