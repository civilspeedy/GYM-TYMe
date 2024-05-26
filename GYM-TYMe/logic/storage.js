/**
 * @file Contains code relating to data storage functionality
 * @module storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * A simple function for storing any data
 * @param {string} key the key to identify the data with
 * @param {*} item the data to be stored
 * @returns {boolean} a boolean value representing if the storage was successful
 */
export async function storeItem(key, item) {
  try {
    const wrappedItem = jts(item);
    await AsyncStorage.setItem(key, wrappedItem);
    return true;
  } catch (e) {
    console.error('Error in storeItem ', e);
    return false;
  }
}

/**
 * A function for fetching data from storage
 * @param {string} key the key to identify the data with
 * @returns {object} the fetched data
 */
export async function getItem(key) {
  try {
    const item = await AsyncStorage.getItem(key);
    const wrappedItem = stj(item);
    return wrappedItem;
  } catch (e) {
    console.error('Error in getItem ', e);
    return null;
  }
}

/**
 * A function to remove data from storage
 * @param {string} key the key to identify the data with
 * @returns {boolean} a boolean value representing whether the data was successfully removed or not
 */
export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error in removeItem ', e);
    return false;
  }
}

/**
 *Checks the type of a passed item to determine if it exists in storage or not
 * @param {object} item
 * @returns {boolean} a boolean value representing whether the item exists or not
 */
export async function checkIfExists(item) {
  try {
    if (item === null || item === undefined) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error('Error in checkIfExists ', e);
    return false;
  }
}
/**
 *Parses a json(object) to a string
 * @param {object} val the object value to parsed as a string
 * @returns {string} the object as a string
 */
const jts = (val) => JSON.stringify(val);

/**
 * Parses a string into a json (object)
 * @param {string} val
 * @returns {object} the string now as an object
 */
const stj = (val) => (val ? JSON.parse(val) : null);
