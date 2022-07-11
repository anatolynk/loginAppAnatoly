import { DefaultTheme } from '@react-navigation/native';
import themeColors from '../config/themeColors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: themeColors.primary,
    background: themeColors.white,
  },
};
