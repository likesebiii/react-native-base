import React from 'react';
import { Insets, View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { NavigationProps } from 'templates/utils';
import { BaseText } from 'components/base/base-text/BaseText';
import {
  ACTIVE_OPACITY,
  changeOpacityOfRgbaColor,
  hexColorToRgba,
} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { aspectStyle } from './aspect';
import { CloseArrowSvg } from '@svgs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '@theme';

export type BaseRebrandNavigationProps = NavigationProps & {
  type?: 'rebrand';
};

const HIT_SLOP: Insets = {
  left: 18,
  top: 18,
  bottom: 18,
  right: 18,
};

const BaseRebrandNavigation: React.FC<BaseRebrandNavigationProps> = ({
  title,
  rightComponent,
  onClose,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const gradientColors = [
    changeOpacityOfRgbaColor(
      hexColorToRgba(colors[theme].main.primaryBackground),
      0.7,
    ),
    hexColorToRgba(colors[theme].main.primaryBackground),
  ];

  return (
    <View style={styles.container} pointerEvents={'box-none'}>
      <View style={styles.bottomBar} pointerEvents={'box-none'}>
        <LinearGradient
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0, y: 0.8 }}
          locations={[0, 1]}
          colors={gradientColors}
          style={styles.gradient}
        />
        <View style={styles.items} pointerEvents={'box-none'}>
          <View style={styles.button} pointerEvents={'box-none'}>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={onClose}
              hitSlop={HIT_SLOP}>
              <CloseArrowSvg height={22} width={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconTextContainer} pointerEvents={'box-none'}>
            <View style={styles.row} pointerEvents={'box-none'}>
              <View style={styles.textContainer} pointerEvents={'box-none'}>
                <BaseText
                  numberOfLines={1}
                  type={'jockey-30'}
                  style={styles.iconText}
                  minimumFontScale={0.85}
                  adjustsFontSizeToFit>
                  {title}
                </BaseText>
              </View>
            </View>
          </View>
          {rightComponent ? (
            <View style={styles.right} pointerEvents={'box-none'}>
              {rightComponent}
            </View>
          ) : undefined}
        </View>
      </View>
    </View>
  );
};

export default BaseRebrandNavigation;
