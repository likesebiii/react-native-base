import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import {
  BellSvg,
  BrainSvg,
  CalendarSvg,
  GrowSvg,
  HandSvg,
  PresentSvg,
  ProfileSvg,
} from '@svgs';
import { BaseText } from 'components/base/base-text/BaseText';
import { colors } from '@theme';

type WelcomePageOnboardingTitleProps = {
  title?: string;
  subtitle?: string;
  step?: string;
  disableStep?: boolean;
  disableIllustration?: boolean;
  illustrationType?:
    | 'welcome'
    | 'brain'
    | 'calendar'
    | 'loading'
    | 'profile'
    | 'grow'
    | 'present';
};

const WelcomePageOnboardingTitle: React.FC<WelcomePageOnboardingTitleProps> = ({
  title = 'Welcome',
  subtitle = 'Let’s get to know you',
  step = '1',
  disableStep = false,
  disableIllustration = false,
  illustrationType = 'welcome',
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const Illustration = React.useMemo(() => {
    if (illustrationType === 'welcome') {
      return HandSvg;
    } else if (illustrationType === 'brain') {
      return BrainSvg;
    } else if (illustrationType === 'profile') {
      return ProfileSvg;
    } else if (illustrationType === 'grow') {
      return GrowSvg;
    } else if (illustrationType === 'loading') {
      return BellSvg;
    } else if (illustrationType === 'present') {
      return PresentSvg;
    } else {
      return CalendarSvg;
    }
  }, [illustrationType]);

  return (
    <View style={styles.container} pointerEvents={'box-none'}>
      <View style={styles.row} pointerEvents={'box-none'}>
        {disableIllustration ? undefined : (
          <Illustration
            height={64}
            width={64}
            fill={colors.light.text.primary}
          />
        )}
        <View
          style={[styles.leftContainer, disableStep ? styles.flex : undefined]}
          pointerEvents={'box-none'}>
          <BaseText
            type={'jockey-30'}
            style={styles.title}
            maxFontSizeMultiplier={1}>
            {title}
          </BaseText>
          <BaseText
            type={'texturina-16-semi-bold'}
            style={styles.subtitle}
            maxFontSizeMultiplier={1}>
            {subtitle}
          </BaseText>
        </View>
      </View>
      {disableStep ? undefined : (
        <View style={styles.sRow} pointerEvents={'box-none'}>
          <BaseText
            type={'texturina-34-regular'}
            style={styles.subtitle}
            maxFontSizeMultiplier={1}>
            {step}
          </BaseText>
          <BaseText
            type={'texturina-20-semi-bold'}
            style={styles.lastStep}
            maxFontSizeMultiplier={1}>
            {'/3'}
          </BaseText>
        </View>
      )}
    </View>
  );
};

export default WelcomePageOnboardingTitle;
