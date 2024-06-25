import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';

type WelcomePageOnboardingTipProps = {
  tip?: string;
};

const WelcomePageOnboardingTip: React.FC<WelcomePageOnboardingTipProps> = ({
  tip = `Drag the card to pick an answer.\nEach corner reveals a different one.`,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <View style={styles.container}>
      <BaseText type={'jockey-24'} style={styles.text}>
        {'TIP:'}
      </BaseText>
      <BaseText
        type={'texturina-16-regular'}
        style={styles.text}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={1.2}
        numberOfLines={2}>
        {tip}
      </BaseText>
    </View>
  );
};

export default WelcomePageOnboardingTip;
