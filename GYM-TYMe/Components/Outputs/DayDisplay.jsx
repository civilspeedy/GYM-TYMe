import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { sJson } from '../../logic/storage';
import { impactAsync } from 'expo-haptics';

export default function DayDisplay({ dayName, button, dayState }) {
  const [colour, setColour] = useState('black');
  const [txtClr, setTxtClr] = useState('white');
  const [state, setState] = useState(false);

  useEffect(() => {
    impactAsync();
    if (state) {
      setColour(sJson.primary);
      setTxtClr('black');
    } else {
      setColour('black');
      setTxtClr('white');
    }
  }, [state]);

  const handlePress = () => {
    if (button) {
      setState(!state);
      dayState[dayName] = !state;
    }
  };

  return (
    <Pressable
      style={[stl.dayBtn, { backgroundColor: colour }]}
      onPress={() => handlePress()}>
      <Text style={{ color: txtClr }}>{dayName}</Text>
    </Pressable>
  );
}

const stl = StyleSheet.create({
  dayBtn: {
    padding: sJson.padding,
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth: sJson.borderSize,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderColor: 'white',
  },
});
