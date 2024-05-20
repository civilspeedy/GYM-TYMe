import { StyleSheet, View } from 'react-native';

import DayDisplay from '../Outputs/DayDisplay';

export default function SelectDays() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let dayState = {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };

  return (
    <View style={stl.container}>
      <View style={stl.dayBtnContainer}>
        {days.map((dayName, index) => (
          <DayDisplay
            dayName={dayName}
            dayState={dayState}
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
