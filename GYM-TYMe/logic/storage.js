import AsyncStorage from '@react-native-async-storage/async-storage';

// fragments from https://react-native-async-storage.github.io/async-storage/docs

const setLaunchedBefore = async (value) => {
    try {
        await AsyncStorage.setItem('launchedBefore', value);
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

const jts = (value) => JSON.stringify(value);

const stj = (value) => (value ? JSON.parse(value) : null);
