import { checkIfExists, getItem, storeItem } from './storage';

const split = {
    name: null,
    dayOfTheWeek: null,
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

export const time = {
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
    distanceL: null,
};

/**
 * function to store a new split, first the storage location is checked to see if it already exits
 * @param {string} name the name the user wishes to give to the spit
 * @param {string} dayOfTheWeek the day of the week the split will be assigned to
 */
async function handleSplitStorage(name, dayOfTheWeek) {
    const item = split;
    item.name = name;
    item.dayOfTheWeek = dayOfTheWeek;

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

// next do exercise storage
