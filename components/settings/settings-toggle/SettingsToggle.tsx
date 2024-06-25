import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import BaseSwitch from 'components/base/base-switch/BaseSwitch';
import { BaseText } from 'components/base/base-text/BaseText';

type SettingsToggleProps = {
  title: string;
  subtitle: string;
  initial?: boolean;
  onChange: (value: boolean) => void;
};

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  title,
  subtitle,
  initial,
  onChange,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [state, setState] = React.useState(initial ?? false);

  const onToggleSwitch = () => {
    setState((state) => {
      return !state;
    });

    onChange(!state);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BaseText type={'texturina-20-semi-bold'} style={styles.title}>
          {title}
        </BaseText>
        <BaseText type={'texturina-16-regular'} style={styles.subtitle}>
          {subtitle}
        </BaseText>
      </View>
      <View style={styles.toggle}>
        <BaseSwitch value={state} onChange={onToggleSwitch} />
      </View>
    </View>
  );
};

export default SettingsToggle;
