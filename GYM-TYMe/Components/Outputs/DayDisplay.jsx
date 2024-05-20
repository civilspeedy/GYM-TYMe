import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { sJson } from '../../logic/storage';
import { impactAsync } from 'expo-haptics';

export default function DayDisplay({ dayName, button, state, setState }) {
  const [colour, setColour] = useState('black');
  const [txtClr, setTxtClr] = useState('white');

  useEffect(() => {
    impactAsync();
    if (state[dayName]) {
      setColour(sJson.primary);
      setTxtClr('black');
    } else {
      setColour('black');
      setTxtClr('white');
    }
  }, [state]);

  const handlePress = () => {
    if (button) {
      setState(dayName);
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
