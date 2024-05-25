import { ScrollView, StyleSheet, View } from 'react-native';
import { dayState } from './SelectDays';
import { useEffect, useState } from 'react';
import DayDisplay from '../Outputs/DayDisplay';
import { impactAsync } from 'expo-haptics';

export default function AssignDays() {
  // day selection working
  const [daysToDisplay, setDaysToDisplay] = useState([]);
  // i genuinely have no idea what is going wrong
  useEffect(() => {
    const getDays = () => {
      const temp = [];

      for (const day in dayState) {
        console.log(day);
        if (dayState[day] === true) {
          temp.push(day);
        }
      }
      console.log(temp);
      setDaysToDisplay((prev) => [...prev, ...temp]);
    };

    getDays();
  }, [dayState]);
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
