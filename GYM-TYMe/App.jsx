import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StartPage from './Components/Pages/StartPage';

export default function App() {
  const [state, setState] = useState(1);
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <StartPage />
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
