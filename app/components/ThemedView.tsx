import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  transparency?: number;
};

export function ThemedView({ style, lightColor, darkColor, transparency = 0.8, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor: backgroundColor }, style]} {...otherProps} />;
}

export function TransThemedView({ style, lightColor, darkColor, transparency = 0.4, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const applyTransparency = (color: string, transparency: number) => {
    const alphaHex = Math.floor(transparency * 255).toString(16).padStart(2, '0');

    if (color && color.startsWith('#')) {
      if (color.length === 7) {
        return color + alphaHex;
      } else if (color.length === 4) {
        const r = color[1];
        const g = color[2];
        const b = color[3];
        return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
      }
    }
    return color;
  };

  const transparentBackgroundColor = backgroundColor
    ? applyTransparency(backgroundColor, transparency)
    : backgroundColor;

  return <View style={[{ backgroundColor: transparentBackgroundColor }, style]} {...otherProps} />;
}
