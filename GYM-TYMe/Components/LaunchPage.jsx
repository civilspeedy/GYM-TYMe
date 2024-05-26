import { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CreateSplits from './Inputs/CreateSplits';
import SelectDays from './Inputs/SelectDays';
import { impactAsync } from 'expo-haptics';
import { sJson } from '../logic/storage';
import AssignDays from './Inputs/AssignDays';

export default function LaunchPage() {
  const [state, setState] = useState(1);
  const [cnfrmTxt, SetCnfrmTxt] = useState('Confirm');

  const [confirmState, setConfirmState] = useState(false); // button needs removing
  // to change when confirm button pressed to trigger async save of options

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    console.log(state);
    if (state === 3) {
      SetCnfrmTxt('Finish');
    } else {
      SetCnfrmTxt('Confirm');
    }
  }, [state]);

  const confirm = () => {
    setConfirmState(true);
    if (state < 3) {
      LayoutAnimation.easeInEaseOut();
      impactAsync();
      setState(state + 1);
    }
  };

  const back = () => {
    if (state > 1) {
      LayoutAnimation.easeInEaseOut();
      impactAsync();
      setState(state - 1);
    }
  };

  return (
    <View style={stl.container}>
      <View style={stl.topSection}>
        <Text style={stl.topText}>Create Your Routine:</Text>
      </View>
      <View style={stl.middleSection}>
        {state === 1 ? (
          <View style={stl.splitsView}>
            <Text style={stl.inputHeading}>Create Splits:</Text>
            <CreateSplits
              confirmState={confirmState}
              setConfirmState={setConfirmState}
            />
          </View>
        ) : state === 2 ? (
          <View style={stl.splitsView}>
            <Text style={stl.inputHeading}>Days:</Text>
            <SelectDays />
          </View>
        ) : state === 3 ? (
          <View style={stl.splitsView}>
            <Text style={stl.inputHeading}>Assign Splits To Days:</Text>
            <AssignDays />
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View style={stl.bottomSection}>
        {state !== 1 ? (
          <Pressable
            style={stl.bottomBtn}
            onPress={() => back()}
          >
            <Text style={stl.btnText}>Back</Text>
          </Pressable>
        ) : (
          <View></View>
        )}
        <Pressable
          style={stl.bottomBtn}
          onPress={() => confirm()}
        >
          <Text style={stl.btnText}>{cnfrmTxt}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topSection: {
    flex: 0.2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  topText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: sJson.primary,
  },
  middleSection: {
    flex: 0.6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 0.2,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  splitsView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  inputHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  bottomBtn: {
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: sJson.secondary,
    margin: 2,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
