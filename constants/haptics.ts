import * as Haptics from 'expo-haptics';

export const normalImpact = () =>
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
