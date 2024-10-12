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


export function TransThemedView({ style, lightColor, darkColor, transparency = 0.8, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const transparentBackgroundColor = backgroundColor
    ? backgroundColor + Math.floor(transparency * 255).toString(16)
    : backgroundColor;

  return <View style={[{ backgroundColor: transparentBackgroundColor }, style]} {...otherProps} />;
}
