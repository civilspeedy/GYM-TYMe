import AsyncStorage from '@react-native-async-storage/async-storage';

const temp = require('../data/templates.json');
const templates = temp[0];

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
    await AsyncStorage.setItem('days', jts(val));
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

export const createSplit = async (val) => {
  const splits = await getSplits();
  let list = []; // needs testing
  const object = templates.split;
  try {
    if (!isSplitsEmpty(splits)) {
      list = splits;
    }
    object.name = val;
    list.push(object);

    await AsyncStorage.setItem('splits', jts(val));
  } catch (e) {
    console.error('err in setSplits ', e);
  }
};

export const getSplits = async (val) => {
  try {
    const val = await AsyncStorage.getItem('splits');
    return stj(val);
  } catch (e) {
    console.error('err in getSplits ', e);
  }
};

export const isSplitsEmpty = async () => {
  try {
    console.log(val);
    if (val === null || val === undefined) {
      return true;
    }
    return false;
  } catch (e) {
    console.error('err in isSplitsEmpty ', e);
  }
  return false;
};
const jts = (val) => JSON.stringify(val);

const stj = (val) => (val ? JSON.parse(val) : null);

export const sJson = require('../data/style.json');
