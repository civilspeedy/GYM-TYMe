/**
 * @file Contains code relating to data storage functionality
 * @module storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const split = {
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
 * function to store a new split, first the storage location is checked to see if it already exits
 * @param {string} name the name the user wishes to give to the spit
 * @param {string} dayOfTheWeek the day of the week the split will be assigned to
 */
async function storeSplit(name, dayOfWeek) {
  const item = split;
  item.name = name;
  item.dayOfWeek = dayOfWeek;

  let list = [];
  if (checkIfExists('splits')) {
    list = await getItem('splits');
    if (!Array.isArray(list)) {
      console.error('Error in handleSplitStorage: not Array');
    }
  }
  list.push(item);
  storeItem('splits', item);
}

/**
 * Returns all splits in storage
 * @returns {Array} an array containing all split objects
 */
async function getSplits() {
  const item = await getItem('splits');
  if (checkIfExists(item)) {
    return item;
  } else {
    console.error(
      'Error in getSplits: You are fetching for splits where there are none.'
    );
    return null;
  }
}

/**
 * Finds a split based of a name and returns
 * @param {Array} splits the array containing the splits
 * @param {string} splitName a name to identify the split with
 * @param {number} counter a number to increment marking the split's location in the list
 * @returns {object} the matching split
 */
function loopThroughSplits(splits, splitName, counter) {
  for (const split in splits) {
    counter++;
    if (split.name == splitName) {
      return split;
    }
  }
  return null;
}

/**
 * Updates data in a stored split, excluding exercise data
 * @param {string} splitName the name of the split to be updated
 * @param {string} dataType the type of data to be updated
 * @param {*} replacementData the new data
 */
async function updateSplitData(splitName, dataType, replacementData) {
  const splits = getSplits();
  let counter = 0;
  const selectedSplit = loopThroughSplits(splits, splitName, counter);

  if (selectedSplit === null) {
    console.error('Error in updateSplits: there are no splits with this name');
    return false;
  }

  switch (dataType) {
    case 'name':
      selectedSplit.name = replacementData;
      break;
    case 'dayOfWeek':
      selectedSplit.dayOfWeek = replacementData;
      break;
    default:
      console.error(
        'Error in updateSplitData: could not find matching attribute'
      );
      return false;
  }

  splits[counter] = selectedSplit;

  storeItem('splits', splits);
  return true;
}

// add exercise to split

async function addExercise(splitName, exerciseType) {}

/**
 * Update a preexisting exercise within a split
 * @param {string} splitName the name of the split containing the exercise
 * @param {number} exerciseId the number to identify the exercise with
 * @param {string} exerciseType the type of exercise
 * @param {string} dataType the type of data being updated
 * @param {*} replacementData the new data
 * @returns {boolean} a boolean representing whether the data was stored
 */
async function updateExercise(
  splitName,
  exerciseId,
  exerciseType,
  dataType,
  replacementData
) {
  const splits = getSplits();

  let selectedExercise = null;
  let splitCount = 0;
  let exerciseCount = 0;

  for (const split in splits) {
    splitCount++;
    if (split.name == splitName) {
      for (const exerciseInList in split.exerciseList) {
        exerciseCount++;
        if (exercise.id == exerciseId) {
          selectedExercise = exerciseInList.exercise;
          break;
        }
      }
    }
  }

  if (selectedExercise === null) {
    console.log('Error in updateExercise: could not find exercise');
    return false;
  }

  if (dataType == 'name') {
    selectedExercise.name = replacementData;
    return true;
  }

  if (exerciseType == 'weight') {
    switch (dataType) {
      case 'weight':
        selectedExercise.weight = replacementData;
        break;
      case 'reps':
        selectedExercise.reps = replacementData;
        break;
      case 'sets':
        selectedExercise.sets = replacementData;
        break;
      default:
        console.error(
          'Error in updateExercise: could not find matching attribute'
        );
        return false;
    }
    return true;
  }

  if (
    (exerciseType == 'cardio' || exerciseType == 'distanceCardio') &&
    dataType == 'time'
  ) {
    selectedExercise.time = replacementData;
    return true;
  } else {
    if (exerciseType == 'distanceCardio' && dataType == 'distance') {
      selectedExercise.distance = replacementData;
      return true;
    }
    console.error(
      'Error in updateExercise: could not find exercise or dataType'
    );
    return false;
  }
}
