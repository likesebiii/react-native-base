import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { aspectStyle } from './aspect';
import { useBaseAspect } from '@hooks';
import { BaseText } from 'components/base/base-text/BaseText';
import BaseSeparator from '../../base/base-separator/BaseSeparator';
import { ACTIVE_OPACITY } from '@utils';

type SettingsPersonalEntryProps = {
  onPress: () => void;
  title: string;
  value?: string;
};

const SettingsPersonalEntry: React.FC<SettingsPersonalEntryProps> = ({
  onPress,
  title,
  value,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.container}>
          <View style={styles.row}>
            <BaseText
              type={'texturina-20-semi-bold'}
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.title}>
              {title}
            </BaseText>
            <BaseText
              type={'texturina-20-regular'}
              style={styles.value}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {' '}
              {value}
            </BaseText>
          </View>
        </View>
      </TouchableOpacity>
      <BaseSeparator />
    </View>
  );
};

export default SettingsPersonalEntry;
