import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log(val);
    try {
        const json = await checkDaysExists();
        const jsonWithVal = updateDayObj(val, json);
        await AsyncStorage.setItem('days', jts(jsonWithVal));
        console.log(jsonWithVal); // object duping
    } catch (e) {
        console.error('Err in setDays ', e);
    }
};

const resetDays = async () => {
    try {
        await AsyncStorage.removeItem('days');
    } catch (e) {
        console.error('err in resetDays ', e);
    }
};

export const getDays = async () => {
    try {
        const val = await AsyncStorage.getItem('days');
        return stj(val);
    } catch (e) {
        console.error('Err in getDays ', e);
    }
};

const checkDaysExists = async () => {
    try {
        const days = await getDays();
        console.log('days: ', days);
        if (days === null || days === undefined) {
            return {
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
            };
        } else {
            return days;
        }
    } catch (e) {
        console.error('err in checkDaysExists ', e);
    }
};

const updateDayObj = (dayString, daysObject) => {
    switch (dayString) {
        case 'Mon':
            daysObject.mon = true;
        case 'Tue':
            daysObject.tue = true;
        case 'Wed':
            daysObject.wed = true;
        case 'Thu':
            daysObject.thu = true;
        case 'Fri':
            daysObject.fri = true;
        case 'Sat':
            daysObject.sat = true;
        case 'Sun':
            daysObject.sun = true;
    }
    return daysObject;
};

const jts = (val) => JSON.stringify(val);

const stj = (val) => (val ? JSON.parse(val) : null);

export const sJson = require('../data/style.json');
