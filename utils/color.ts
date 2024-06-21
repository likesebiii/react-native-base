export const hexColorToRgbaArray = (hex: string) => {
  const DEFAULT_RGBA = [0, 0, 0, 1];

  try {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      let colors = hex.substring(1).split('');
      const res: any = '0x' + colors.join('');

      if (colors.length === 3) {
        colors = [
          colors[0],
          colors[0],
          colors[1],
          colors[1],
          colors[2],
          colors[2],
        ];
      }

      return [(res >> 16) & 255, (res >> 8) & 255, res & 255, 1];
    } else {
      console.log(`[Warning] Invalid Hex: ${hex}`);

      return DEFAULT_RGBA;
    }
  } catch (err) {
    console.log(`[Warning] ${err}`);

    return DEFAULT_RGBA;
  }
};

export const rgbaArrayToRgbaColor = (rgbaArray: number[]) => {
  return `rgba(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]}, ${rgbaArray[3]})`;
};

export const hexColorToRgba = (hex: string) => {
  const rgbaArray = hexColorToRgbaArray(hex);
  const rgba = rgbaArrayToRgbaColor(rgbaArray);

  return rgba;
};

export const changeOpacityOfRgbaColor = (rgba: string, newOpacity: number) => {
  const rgbaArray = rgba.split(',');

  rgbaArray[rgbaArray.length - 1] = newOpacity.toString() + ')';

  return rgbaArray.join(',');
};

export const changeOpacityOfHexColor = (hex: string, newOpacity: number) => {
  const rgba = hexColorToRgba(hex);

  return changeOpacityOfRgbaColor(rgba, newOpacity);
};
