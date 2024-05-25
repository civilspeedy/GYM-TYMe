import { StyleSheet, View } from 'react-native';

import DayDisplay from '../Outputs/DayDisplay';
import { useEffect, useState } from 'react';

export let dayState = {
  Mon: false,
  Tue: false,
  Wed: false,
  Thu: false,
  Fri: false,
  Sat: false,
  Sun: false,
};

export default function SelectDays({ confirmSate, setConfirmSate }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [day, setDay] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const changeDayState = (dayName) => {
    setDay((prev) => ({
      ...prev,
      [dayName]: !prev[dayName],
    }));
  };

  useEffect(() => {
    dayState = day;
  }, [day]);

  return (
    <View style={stl.container}>
      <View style={stl.dayBtnContainer}>
        {days.map((dayName, index) => (
          <DayDisplay
            dayName={dayName}
            state={day}
            setState={(name) => changeDayState(name)}
            button={true}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  dayBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
});
