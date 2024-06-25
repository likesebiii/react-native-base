import { aspectStyle } from './aspect';
import React from 'react';
import { Platform, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import BaseSocialButton from 'components/base/base-social-button/BaseSocialButton';
import { NAVIGATION_CONTROLLER } from 'services/navigation';

type BaseSocialButtonsProps = {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  loading?: boolean;
  authenticateType?: 'login' | 'sign-up';
  email?: boolean;
};

const BaseSocialButtons: React.FC<BaseSocialButtonsProps> = ({
  onGooglePress,
  onApplePress,
  loading,
  authenticateType = 'login',
  email = false,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const onEmailPress = () => {
    NAVIGATION_CONTROLLER.navigate('fk.AuthenticateDrawer', {
      state: 'sign-up',
    });
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <BaseSocialButton
          type={'apple'}
          onPress={onApplePress}
          loading={loading}
          authenticateType={authenticateType}
        />
      ) : undefined}
      <View style={styles.top}>
        <BaseSocialButton
          type={'google'}
          onPress={onGooglePress}
          loading={loading}
          authenticateType={authenticateType}
        />
      </View>
      {email ? (
        <View style={styles.top}>
          <BaseSocialButton
            type={'email'}
            onPress={onEmailPress}
            loading={loading}
            authenticateType={authenticateType}
          />
        </View>
      ) : undefined}
    </View>
  );
};

export default BaseSocialButtons;
