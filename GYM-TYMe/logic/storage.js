/**
 * @file Contains code relating to data storage functionality
 * @module storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const split = {
  id: null,
  name: null,
  dayOfWeek: null,
  exerciseList: [],
};

const exercise = {
  id: null,
  exercise: null,
  done: false,
};

const weightExercise = {
  name: null,
  weight: null,
  reps: null,
  sets: null,
};

const time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
};

const cardio = {
  name: null,
  time: time,
};

const cardioDistance = {
  name: null,
  time: time,
  distance: null,
};

const goal = {
  id: null,
  value: null,
};

const date = {
  day: null,
  month: null,
  year: null,
};

const progress = {
  id: null,
  value: null,
  date: date,
};

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

    const exists = checkIfExists(wrappedItem);
    if (exists) {
      return wrappedItem;
    } else {
      return null;
    }
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
 * Gets next available id
 * @param {Array} list
 * @returns {number} the id to be used
 */
function nextID(list) {
  const length = list.length;

  if (length == 0) {
    return 0;
  } else {
    return length + 1;
  }
}

// all splits should have an id and that is used to link exercises
// exercises should be stored separately

/**
 * Stores an new empty split in storage
 * @param {string} name the name of the split
 */
async function newSplit(name) {
  let splits = getItem('splits');

  const newSplit = split;
  newSplit.id = nextID(splits);
  newSplit.name = name;

  if (splits !== null) {
    splits.push(newSplit);
  } else {
    splits = [];
    newList.push(newSplit);
  }
  storeItem(splits);
}

async function updateSplit(id, dataType, data) {
  let splits = getItem('splits');
  let selectedSplit = null;

  if (splits !== null) {
    for (const split in splits) {
      if (split.id == id) {
        selectedSplit = split;
      }
    }
  }
}
