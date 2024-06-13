import Picker from '@/components/Picker';
import { universalStyle } from '@/constants/styling';
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  return (
    <View style={universalStyle.background}>
      <Text>Hello!</Text>
      <Picker
        title={'title'}
        options={['hello']}
      />
    </View>
  );
}
