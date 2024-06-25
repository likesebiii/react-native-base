import { useBaseAspect } from '@hooks';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { aspectStyle } from './aspect';
import {
  PaywallCheckProSvg,
  PaywallLockProSvg,
  PaywallBellProSvg,
  PaywallStarProSvg,
} from '@svgs';
import { colors } from '@theme';
import { BaseText } from 'components/base/base-text/BaseText';
import { changeOpacityOfRgbaColor, hexColorToRgba, SvgProps } from '@utils';

type PaywallTrialExplanatoryStepProps = {
  enabled?: boolean;
  lineThrough?: boolean;
  title: string;
  subtitle?: string;
  type?: 'check' | 'bell' | 'lock' | 'star';
  separator?: 'enabled' | 'disabled';
};

const ICON_SVG: Record<
  'check' | 'bell' | 'lock' | 'star',
  React.FC<SvgProps>
> = {
  check: PaywallCheckProSvg,
  bell: PaywallBellProSvg,
  star: PaywallStarProSvg,
  lock: PaywallLockProSvg,
};

const PaywallTrialExplanatoryStep: React.FC<
  PaywallTrialExplanatoryStepProps
> = ({
  enabled = true,
  lineThrough = false,
  separator,
  title,
  subtitle,
  type = 'check',
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const Icon = useMemo(() => {
    return ICON_SVG[type];
  }, [type]);

  const textStyle = {
    color: changeOpacityOfRgbaColor(
      hexColorToRgba(colors[theme].text.primary),
      enabled ? 1 : 0.6,
    ),
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icon fill={colors[theme].text.disabled} height={40} width={40} />
        <View style={styles.separatorContainer}>
          <View
            style={[
              styles.separator,
              separator === 'enabled'
                ? styles.separatorEnabled
                : separator === 'disabled'
                ? styles.separatorDisabled
                : styles.separatorUndefined,
            ]}
          />
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.titleContainer}>
          <BaseText
            type={'jockey-20'}
            style={[textStyle, lineThrough ? styles.lineThrough : undefined]}>
            {title}
          </BaseText>
        </View>
        <BaseText type={'texturina-16-regular'} style={styles.subtitle}>
          {subtitle ?? ''}
        </BaseText>
      </View>
    </View>
  );
};

export default PaywallTrialExplanatoryStep;
