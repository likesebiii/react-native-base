import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '@types';
import { sizing } from '@theme';
import { BASE_TOP_PADDING } from '@utils';

type AspectStyle = {
  container: ViewStyle;
  row: ViewStyle;
  leftContainer: ViewStyle;
  title: ViewStyle;
  subtitle: ViewStyle;
  lastStep: ViewStyle;
  sRow: ViewStyle;
  flex: ViewStyle;
};

export const aspectStyle = (_: ThemeType) => {
  return StyleSheet.create<AspectStyle>({
    container: {
      top: BASE_TOP_PADDING - 10,
      left: 0,
      right: 0,
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'row',
      paddingHorizontal: sizing.xl,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: { flex: 1 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    leftContainer: { marginLeft: sizing.xs },
    title: { color: '#0D394C' },
    subtitle: { color: '#30718D' },
    lastStep: { color: '#30718D', top: sizing.s },
    sRow: { flexDirection: 'row' },
  });
};
