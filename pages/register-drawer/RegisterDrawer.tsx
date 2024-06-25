import React from 'react';
import { useBaseAnalytics, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { PageProps } from 'templates/utils';
import Drawer from 'templates/drawer/Drawer';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { BaseText } from 'components/base/base-text/BaseText';
import { View } from 'react-native';
import BaseSocialButtons from 'components/base/base-social-buttons/BaseSocialButtons';
import BaseTermsOfService from 'components/base/base-terms-of-service/BaseTermsOfService';

type RegisterDrawerProps = {
  type?: 'normal' | 'nsi-limit' | 'nsi-access' | 'nsi-create';
};

const RegisterDrawer: React.FC<RegisterDrawerProps & PageProps> = ({
  type = 'normal',
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const onClose = () => {
    NAVIGATION_CONTROLLER.close();
  };

  useBaseAnalytics({ page: 'register-drawer' });

  return (
    <Drawer
      onClose={onClose}
      bottomSheetProps={{
        backgroundStyle: styles.modalStyle,
        onClose: onClose,
      }}>
      <View style={styles.container}>
        {type.includes('nsi') ? (
          <>
            <BaseText
              style={styles.NSITitle}
              type={
                'texturina-24-semi-bold'
              }>{`Sign up to unlock unlimited fun!`}</BaseText>
            {type === 'nsi-limit' ? (
              <BaseText
                style={styles.NSISubtitle}
                type={'texturina-16-regular'}
                maxFontSizeMultiplier={1}>
                {`Hey there, sneak-peeker! You've gobbled up all your freebie cards. Hungry for more?`}
                <BaseText
                  type={'texturina-16-bold'}
                  maxFontSizeMultiplier={1}>{` Sign up `}</BaseText>
                {`and keep the party rolling!`}
              </BaseText>
            ) : (
              <BaseText
                style={styles.NSISubtitle}
                type={'texturina-16-regular'}>
                {`Looks like you've stumbled upon a members-only party! No worries, just a quick`}
                <BaseText type={'texturina-16-bold'}>{` sign-up `}</BaseText>
                {`away from full access and endless features!`}
              </BaseText>
            )}
          </>
        ) : undefined}
      </View>
      <BaseSocialButtons authenticateType={'sign-up'} email />
      <BaseTermsOfService />
    </Drawer>
  );
};

export default RegisterDrawer;
