import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { AppleSvg, GoogleSvg, EmailSvg } from '@svgs';
import { BaseText } from '../base-text/BaseText';
import { BaseButton } from '../base-button/BaseButton';
import { AuthenticateType } from '@types';

type BaseSocialButtonProps = {
  type: AuthenticateType;
  onPress?: () => void;
  loading?: boolean;
  authenticateType?: 'login' | 'sign-up';
};

const ICONS = { apple: AppleSvg, google: GoogleSvg, email: EmailSvg };

const BaseSocialButton: React.FC<BaseSocialButtonProps> = ({
  type,
  onPress,
  loading,
  authenticateType,
}) => {
  const { styles } = useBaseAspect(aspectStyle);
  const Icon = ICONS[type];

  return (
    <BaseButton
      state={loading ? 'loading' : 'enabled'}
      buttonStyle={[styles.container, styles[`${type}Container`]]}
      onPress={onPress}>
      <View style={styles.row}>
        <Icon />
        <View style={styles.textContainer}>
          <BaseText
            type={'texturina-16-semi-bold'}
            style={styles[`${type}Text`]}>
            {authenticateType === 'login' ? 'Continue with ' : 'Sign up with '}
            <BaseText type={'texturina-16-semi-bold'} style={styles.capitalize}>
              {type}
            </BaseText>
          </BaseText>
        </View>
      </View>
    </BaseButton>
  );
};

export default BaseSocialButton;
