import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// fragments from https://react-native-async-storage.github.io/async-storage/docs

const setLaunchedBefore = async (val) => {
    try {
        await AsyncStorage.setItem('launchedBefore', val);
    } catch (e) {
        console.error('Err in createFirstLaunchValue ', e);
    }
};

export const getLaunchedBefore = async () => {
    try {
        const val = await AsyncStorage.getItem('launchedBefore');
        return checkLaunchedBefore(val);
    } catch (e) {
        console.error('Err in getFirstLaunchValue ', e);
    }
};

const checkLaunchedBefore = (firstLaunch) => {
    if (firstLaunch === null) {
        setLaunchedBefore(jts(true));
        return false;
    } else {
        return true;
    }
};

export const setDays = async (val) => {
    try {
        await AsyncStorage.setItem('days', val);
    } catch (e) {
        console.error('Err in setDays ', e);
    }
}

export const getDays = async () => {
    try {
        const val = await AsyncStorage.getItem('days');
        return val;
    } catch (e) {
        console.error('Err in getDays ',e )
    }
}


const jts = (val) => JSON.stringify(val);

const stj = (value) => (value ? JSON.parse(val) : null);

export const sJson = require('../data/style.json')
