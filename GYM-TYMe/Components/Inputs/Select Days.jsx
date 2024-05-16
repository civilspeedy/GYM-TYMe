import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { impactAsync } from 'expo-haptics';
import { getDays, sJson } from '../../logic/storage';
import { setDayState } from '../../logic/day manager';
import { getEnforcing } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function SelectDays() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [storedState, setStoredState] = useState({});
  getDays()
    .then((val) => setStoredState(val))
    .catch((e) => console.error('err getting storedState ', e));

  const Day = ({ dayName }) => {
    const [colour, setColour] = useState('black');
    const [txtClr, setTxtClr] = useState('white');
    const [state, setState] = useState(storedState[dayName]);

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
      setDayState(dayName);
      setState(!state);
    };

    return (
      <Pressable
        style={[stl.dayBtn, { backgroundColor: colour }]}
        onPress={() => handlePress()}>
        <Text style={{ color: txtClr }}>{dayName}</Text>
      </Pressable>
    );
  };

  return (
    <View style={stl.container}>
      <View style={stl.dayBtnContainer}>
        {days.map((dayName, index) => (
          <Day
            dayName={dayName}
            key={index}
          />
        ))}
      </View>
      <Pressable style={stl.btn}>
        <Text style={stl.btnTxt}>Rest</Text>
      </Pressable>
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
  btnTxt: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  btn: {
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: sJson.secondary,
    margin: 10,
  },
});
