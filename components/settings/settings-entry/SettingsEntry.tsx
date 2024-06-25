import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ACTIVE_OPACITY } from '@utils';

type SettingsEntryProps = {
  onPress: () => void;
  title: string | JSX.Element;
  divider?: boolean;
};

const SettingsEntry: React.FC<SettingsEntryProps> = ({
  onPress,
  title,
  divider = true,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <View
      style={[
        styles.border,
        divider === false ? { borderBottomWidth: 0 } : {},
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.optionContainer}
        activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.title}>
          {typeof title === 'string' ? (
            <BaseText type={'texturina-16-regular'} style={styles.option}>
              {title}
            </BaseText>
          ) : (
            title
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsEntry;
