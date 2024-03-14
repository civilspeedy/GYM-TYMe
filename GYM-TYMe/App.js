import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getFirstLaunchValue } from './logic/storage';

export default function App() {
  getFirstLaunchValue()
    .then((val) => {
      console.log(val);
    })
    .catch((e) => console.error('Err in firstLaunch fetch ', e));

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
