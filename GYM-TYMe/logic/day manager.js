import { setDays } from './storage';

const resetDayState = () => {
  return {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };
};

let dayState = resetDayState();

export const setDayState = (val) => {
  dayState[val] = !dayState[val];
  setDays(dayState);
};
