import { ThemeType } from '@types';
import { useMemo } from 'react';
import React from 'react';
import useBaseDimensions from './useBaseDimensions';

type GetDimensionsType = (height: number, width: number) => void;

const useBaseAspect = <K extends GetDimensionsType | any>(
  aspectStyle?: (theme: ThemeType) => K,
): {
  theme: ThemeType;
  styles: K extends GetDimensionsType ? ReturnType<K> : K;
  screenHeight: number;
  screenWidth: number;
} => {
  const theme = 'light' as ThemeType;

  const darkStyles = React.useMemo(() => aspectStyle?.('dark'), [theme]);
  const lightStyles = React.useMemo(() => aspectStyle?.('light'), [theme]);

  const { height, width } = useBaseDimensions({
    update: !(
      typeof darkStyles !== 'function' || typeof lightStyles !== 'function'
    ),
  });

  const styles = useMemo(() => {
    if (typeof darkStyles === 'function' && typeof lightStyles === 'function') {
      switch (theme) {
        case 'dark':
          return darkStyles(height, width);
        case 'light':
        default:
          return lightStyles(height, width);
      }
    } else {
      switch (theme) {
        case 'dark':
          return darkStyles;
        case 'light':
        default:
          return lightStyles;
      }
    }
  }, [theme, height]);

  return { theme, styles, screenHeight: height, screenWidth: width };
};

export default useBaseAspect;
