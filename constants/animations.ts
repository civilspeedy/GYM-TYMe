import { LayoutAnimation } from 'react-native';

export function smoothAnimation() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}
