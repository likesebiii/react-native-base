import React from 'react';
import { StyleProp, TextStyle, ViewStyle, View } from 'react-native';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ACTIVE_OPACITY } from '@utils';
import { useBaseAspect } from '@hooks';

type BaseSecondaryButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export const BaseSecondaryButton: React.FC<BaseSecondaryButtonProps> = ({
  title,
  titleStyle,
  style,
  onPress,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
      <View style={[styles.container, style]}>
        <BaseText
          type={'texturina-16-semi-bold'}
          style={[styles.text, titleStyle]}>
          {title}
        </BaseText>
      </View>
    </TouchableOpacity>
  );
};
