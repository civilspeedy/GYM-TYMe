import { StyleSheet, View } from 'react-native';
import { dayState } from './SelectDays';
import { useEffect, useState } from 'react';

export default function AssignDays() {
  // day selection working but needs impanation here
  const [daysToDisplay, setDaysToDisplay] = useState([]);

  useEffect(() => {
    const getDays = () => {
      const tempStore = [];
      for (day in dayState) {
        console.log('day value: ', dayState[day]);
        if (dayState[day] === true) {
          tempStore.push(day);
        }
      }

      setDaysToDisplay(tempStore);
    };

    getDays();
  }, []);
  console.log(daysToDisplay);

  return <View style={stl.container}></View>;
}
const stl = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
  flatList: {
    flex: 1,
  },
});
