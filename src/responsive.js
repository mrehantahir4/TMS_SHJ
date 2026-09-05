import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Standard mobile screen design size (Figma/Standard layout: 375 x 812)
const baseWidth = 375;
const baseHeight = 812;

// 1. Width, Margin, Padding ke liye (Horizontal scale)
export const wp = (size) => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

// 2. Height, Gap ke liye (Vertical scale)
export const hp = (size) => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

// 3. Fonts ke liye taake har device par text size perfect scale ho
export const fs = (size) => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};