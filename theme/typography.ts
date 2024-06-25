import { scaleFontSizeToPixelRatioAndroid } from '@utils';
import { Platform, TextStyle } from 'react-native';

const getTexturinaTypeForFontSize: <
  T extends 10 | 12 | 14 | 16 | 18 | 20 | 24 | 26 | 30 | 34 | 36 | 40,
  M extends 'regular' | 'italic' | 'semi-bold' | 'bold' | 'black',
  K extends 'Regular' | 'Italic' | 'SemiBold' | 'Bold' | 'Black',
>(
  size: T,
) => {
  type: `texturina-${T}-${M}`;
  size: T;
  style: K;
}[] = (size) => {
  return [
    { type: `texturina-${size}-regular`, size, style: 'Regular' },
    { type: `texturina-${size}-italic`, size, style: 'Italic' },
    { type: `texturina-${size}-semi-bold`, size, style: 'SemiBold' },
    { type: `texturina-${size}-bold`, size, style: 'Bold' },
    { type: `texturina-${size}-black`, size, style: 'Black' },
  ] as any;
};

const getJockeyTypeForFontSize: <
  T extends 16 | 20 | 24 | 28 | 30 | 34 | 40 | 48,
  K extends 'Regular',
>(
  size: T,
) => {
  type: `jockey-${T}`;
  size: T;
  style: K;
}[] = (size) => {
  return [{ type: `jockey-${size}`, size, style: 'Regular' }] as any;
};

const TEXT_TYPE = [
  // Texturina
  ...getTexturinaTypeForFontSize(10),
  ...getTexturinaTypeForFontSize(12),
  ...getTexturinaTypeForFontSize(14),
  ...getTexturinaTypeForFontSize(16),
  ...getTexturinaTypeForFontSize(18),
  ...getTexturinaTypeForFontSize(20),
  ...getTexturinaTypeForFontSize(24),
  ...getTexturinaTypeForFontSize(26),
  ...getTexturinaTypeForFontSize(30),
  ...getTexturinaTypeForFontSize(34),
  ...getTexturinaTypeForFontSize(36),
  ...getTexturinaTypeForFontSize(40),
  // Jockey
  ...getJockeyTypeForFontSize(16),
  ...getJockeyTypeForFontSize(20),
  ...getJockeyTypeForFontSize(24),
  ...getJockeyTypeForFontSize(28),
  ...getJockeyTypeForFontSize(30),
  ...getJockeyTypeForFontSize(34),
  ...getJockeyTypeForFontSize(40),
  ...getJockeyTypeForFontSize(48),
] as const;

export type TextType = (typeof TEXT_TYPE)[number]['type'];

const getTypographyForTextType = (
  type: TextType,
  size: number,
  style: 'Regular' | 'Italic' | 'SemiBold' | 'Bold' | 'Black',
  disableScale?: boolean,
): TextStyle => {
  const fontFamily = type.includes('texturina')
    ? `Texturina-${style}`
    : `JockeyOne-${style}`;
  const lineHeight = size + (type.includes('texturina') ? 3 : 4);

  return disableScale
    ? {
        fontFamily: fontFamily,
        fontSize: size,
        lineHeight: lineHeight,
      }
    : {
        fontFamily: fontFamily,
        fontSize:
          Platform.OS === 'android'
            ? scaleFontSizeToPixelRatioAndroid(size)
            : size,
        lineHeight:
          Platform.OS === 'android'
            ? scaleFontSizeToPixelRatioAndroid(lineHeight)
            : lineHeight,
      };
};

const TYPOGRAPHY_WITH_SCALE: Record<TextType, TextStyle> = TEXT_TYPE.reduce(
  (acc, cur) => {
    const textType = cur.type;
    const textStyle = getTypographyForTextType(textType, cur.size, cur.style);

    acc[textType] = textStyle;

    return acc;
  },
  {} as Record<TextType, TextStyle>,
);

const TYPOGRAPHY_WITHOUT_SCALE: Record<TextType, TextStyle> = TEXT_TYPE.reduce(
  (acc, cur) => {
    const textType = cur.type;
    const textStyle = getTypographyForTextType(
      textType,
      cur.size,
      cur.style,
      true,
    );

    acc[textType] = textStyle;

    return acc;
  },
  {} as Record<TextType, TextStyle>,
);

export const typography = {
  scale: TYPOGRAPHY_WITH_SCALE,
  noscale: TYPOGRAPHY_WITHOUT_SCALE,
};
