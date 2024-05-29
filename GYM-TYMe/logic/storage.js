/**
 * @file Contains code relating to data storage functionality.
 * @module storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const split = {
  id: null,
  name: null,
  dayOfWeek: null,
};

const exercise = {
  id: null,
  splitId: null,
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
 *Parses a json(object) to a string.
 * @param {object} val the object value to parsed as a string
 * @returns {string} the object as a string
 */
const jts = (val) => JSON.stringify(val);

/**
 * Parses a string into a json (object).
 * @param {string} val
 * @returns {object} the string now as an object
 */
const stj = (val) => (val ? JSON.parse(val) : null);

/**
 * A simple function for storing any data.
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
 * A function for fetching data from storage.
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
 * A function to remove data from storage.
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
 *Checks the type of a passed item to determine if it exists in storage or not.
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
 * Finds a item in an array based off id.
 * @param {Array} list the array to be searched through
 * @param {number} id the id of the item being searched for
 * @returns {object} the item
 */
async function itemSearch(list, id) {
  if (list !== null) {
    for (const item in list) {
      if (item.id == id) {
        return item;
      }
    }
  } else {
    console.error('Error in itemSearch: could not find');
    return null;
  }
}

/**
 * Gets next available id.
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
 * Stores an new empty split in storage.
 * @param {string} name the name of the split
 */
async function newSplit(name) {
  let splits = getItem('splits');

  const temp = split;
  temp.id = nextID(splits);
  temp.name = name;

  if (splits !== null) {
    splits.push(newSplit);
  } else {
    splits = [];
    splits.push(newSplit);
  }
  storeItem(splits);
}

/**
 * Updates the data of a given split.
 * @param {number} id the id of the split to be updated
 * @param {string} dataType the type of data to updated
 * @param {*} data the new data for the update
 * @returns {boolean} a boolean value representing whether the update was successful
 */
async function updateSplit(id, dataType, data) {
  let splits = getItem('splits');
  const selectedSplit = itemSearch(splits, id);

  try {
    selectedSplit[dataType] = data; // try this approach instead of switches
  } catch (e) {}

  switch (dataType) {
    case 'name':
      selectedSplit.name = data;
      break;
    case 'dayOfWeek':
      selectedSplit.dayOfWeek = data;
      break;
    default:
      console.error('Error in updateSplit: attribute could not be found');
      return false;
  }

  splits[id] = selectedSplit;

  storeItem('splits', splits);
  return true;
}

/**
 * A creates a new empty exercise and stores it.
 * @param {string} name the name of the exercise
 * @param {string} type the type of exercise
 * @param {number} splitId the id of the split the exercise is linked to
 * @returns {boolean} a boolean value representing if the the exercise was stored or not
 */
async function newExercise(name, type, splitId) {
  const splits = getItem('splits');
  const split = itemSearch(splits, splitId);
  let exercises = getItem('exercises');

  if (split !== null) {
    const temp = exercise;
    temp.id = nextID(exercises);
    temp.splitId = splitId;

    let exerciseTemp = null;

    switch (type) {
      case 'weight':
        exerciseTemp = weightExercise;
        break;

      case 'cardio':
        exerciseTemp = cardio;
        break;

      case 'distance':
        exerciseTemp = cardioDistance;
        break;

      default:
        console.error('Error in newExercise: no attribute matches.');
        return false;
    }

    exerciseTemp.name = name;

    if (exercises === null) {
      exercises = [];
    }
    exercises.push(exerciseTemp);
    return true;
  } else {
    console.error('Error in newExercise: No ID match');
    return false;
  }
}

async function updateExercise(id, exerciseType, dataType, data) {
  const exercises = getItem('exercises');
  let selectedExercise = null;

  if (exercises !== null) {
    for (const exercise in exercises) {
      if (exercise.id == id) {
        selectedExercise = exercise;
      }
    }

    switch (dataType) {
      case 'name':
        selectedExercise.name = data;
        break;
      case 'id':
        selectedExercise.id = data;
        break;
      case 'split id':
        selectedExercise.splitId = data;
        break;
      default:
        const subExercise = selectedExercise.exercise;

        switch (exerciseType) {
          case 'weight':
            switch (dataType) {
              case 'weight':
                subExercise.weight = data;
                break;
              case 'reps':
                subExercise.reps = data;
                break;
              case 'sets':
                break;
            }
            break;
          case 'cardio':
            break;
          case 'distance':
            break;
          default:
            console.error('Error in updateExercise: exerciseType mismatch');
            return false;
        }
    }
  } else {
    console.error('Error in updateExercise: exercises is empty.');
    return false;
  }
}
