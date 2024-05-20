import { StyleSheet, Text, View } from 'react-native';
import Graph from './Outputs/Graph';

export default function ProgressPage() {
  return (
    <View>
      <Text>Text</Text>
      <Graph />
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
