import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getLaunchedBefore } from './logic/storage';
import LaunchPage from './Components/LaunchPage';

export default function App() {
    const [launchedBefore, setLaunchedBefore] = useState(false);

    getLaunchedBefore()
        .then((value) => {
            setLaunchedBefore(value);
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
        backgroundColor: '#5F49B6',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
