import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps as Props } from 'react-native-svg';

export type SvgProps = Props & {
  fill?: string;
  stroke?: string;
  height?: number | string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};
