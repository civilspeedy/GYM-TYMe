import { ScrollView, StyleSheet, View } from 'react-native';
import { dayState } from './SelectDays';
import { useEffect, useState } from 'react';
import DayDisplay from '../Outputs/DayDisplay';
import { impactAsync } from 'expo-haptics';

export default function AssignDays() {
  // day selection working but needs impanation here
  const [daysToDisplay, setDaysToDisplay] = useState([]);

  useEffect(() => {
    const getDays = () => {
      const tempStore = [];
      for (day in dayState) {
        if (dayState[day] === true) {
          tempStore.push(day);
        }
      }

      setDaysToDisplay(tempStore);
    };

    getDays();
  }, []);
  console.log(daysToDisplay);

  const handleScroll = () => {
    impactAsync();
  };

  // updating issue on android

  return (
    <View style={stl.container}>
      <ScrollView style={stl.list}>
        {daysToDisplay.map((dayName, index) => (
          <DayDisplay
            key={index}
            dayName={dayName}
            state={false}
            setState={null}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const stl = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
  list: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'red',
  },
});
