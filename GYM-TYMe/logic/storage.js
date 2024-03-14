import AsyncStorage from '@react-native-async-storage/async-storage';

// fragments from https://react-native-async-storage.github.io/async-storage/docs

const createFirstLaunchValue = async () => {
  try {
    await AsyncStorage.setItem('firstLaunch', true);
  } catch (e) {
    console.error('Err in createFirstLaunchValue ', e);
  }
};

export const getFirstLaunchValue = async () => {
  try {
    const val = await AsyncStorage.getItem('firstLaunch');
    if (!val) {
      console.log('firstLaunch value is false ');
    } else if (val !== null) {
      console.log('first launch value is true. Setting to false...');
      createFirstLaunchValue();
    }
  } catch (e) {
    console.error('Err in getFirstLaunchValue ', e);
  }
};
