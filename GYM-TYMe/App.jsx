import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { getLaunchedBefore } from './logic/storage';
import LaunchPage from './Components/LaunchPage';

export default function App() {
  const [launchedBefore, setLaunchedBefore] = useState(false);
  const systemTheme = useColorScheme(); // not working correctly

  getLaunchedBefore()
    .then((val) => {
      setLaunchedBefore(val);
    })
    .catch((e) => console.error('Err in firstLaunch fetch ', e));

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <LaunchPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
