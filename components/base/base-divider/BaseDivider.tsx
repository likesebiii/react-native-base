import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import LinearGradient from 'react-native-linear-gradient';
import { changeOpacityOfRgbaColor, hexColorToRgba } from '@utils';
import { colors } from '@theme';

type BaseDividerProps = { style?: ViewStyle; color?: string };

const BaseDivider: React.FC<BaseDividerProps> = ({
  style,
  color: colorFromProps,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const color = colorFromProps ?? colors[theme].text.secondary;

  const gradientColors = [
    changeOpacityOfRgbaColor(hexColorToRgba(color), 0),
    color,
  ];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <LinearGradient
          start={{ x: 0.35, y: 0.0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 1.0]}
          colors={gradientColors}
          style={styles.separatorLeftGradient}
        />
        <LinearGradient
          start={{ x: 0.65, y: 0.0 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 1.0]}
          colors={gradientColors}
          style={styles.separatorRightGradient}
        />
      </View>
    </View>
  );
};

export default BaseDivider;
