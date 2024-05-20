import { FlatList, StyleSheet, View } from 'react-native';

export default function AssignDays() {
  // need successful day selection working to continue this
  return (
    <View style={stl.container}>
      <FlatList />
    </View>
  );
}
const stl = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
});
