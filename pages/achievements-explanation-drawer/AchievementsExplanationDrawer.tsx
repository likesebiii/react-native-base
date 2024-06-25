import React from 'react';
import { useBaseAnalytics, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { PageProps } from 'templates/utils';
import Drawer from 'templates/drawer/Drawer';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { BaseText } from 'components/base/base-text/BaseText';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import { BaseImage } from 'components/base/base-image/BaseImage';
import { View } from 'react-native';

type AchievementsExplanationDrawerProps = {};

const EXPLANATION_PHOTO = require('resources/assets/welcome-intro-2.png');

const AchievementsExplanationDrawer: React.FC<
  AchievementsExplanationDrawerProps & PageProps
> = ({}) => {
  const { styles, screenWidth } = useBaseAspect(aspectStyle);

  const onClose = () => {
    NAVIGATION_CONTROLLER.close();
  };

  useBaseAnalytics({ page: 'achievements-explanation-drawer' });

  return (
    <Drawer
      onClose={onClose}
      bottomSheetProps={{
        backgroundStyle: styles.modalStyle,
        onClose: onClose,
      }}>
      <View style={styles.container}>
        <BaseImage
          source={EXPLANATION_PHOTO}
          style={{
            width: screenWidth * 0.6,
            height: screenWidth * 0.6,
            marginBottom: 32,
          }}
          resizeMode={'contain'}
        />
        <BaseText
          style={styles.NSITitle}
          numberOfLines={1}
          adjustsFontSizeToFit
          type={'texturina-26-semi-bold'}>{`Collect trophies`}</BaseText>
        <BaseText
          style={styles.NSISubtitle}
          type={'texturina-20-regular'}
          maxFontSizeMultiplier={1}>
          {`Discover history topic by topic. Answer question to `}
          <BaseText
            type={'texturina-18-bold'}
            maxFontSizeMultiplier={1}>{`unlock `}</BaseText>
          {`new facts and `}
          <BaseText
            type={'texturina-18-bold'}
            maxFontSizeMultiplier={1}>{`collect`}</BaseText>
          {' achievements.'}
        </BaseText>
        <BasePrimaryButton title={`Let's go`} onPress={onClose} />
      </View>
    </Drawer>
  );
};

export default AchievementsExplanationDrawer;
