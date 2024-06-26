import { impactAsync } from 'expo-haptics';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { createSplit, sJson } from '../../logic/storage';

export default function CreateSplits({ confirmState, setConfirmState }) {
  const [splitList, setSplitList] = useState([]);

  const MakeSplit = () => {
    const [title, setTitle] = useState('');

    useEffect(() => {
      if (confirmState) {
        console.log('splitList: ', splitList);
        for (const split in splitList) {
          console.log('here');
          createSplit(split);
        }
        setConfirmState(false);
      }
      console.log('confirm state: ', confirmState);
    }, [confirmState]);

    return (
      <View style={stl.splitContainer}>
        <TextInput
          style={[stl.splitEntry, stl.splitFont]}
          onChangeText={setTitle}
          value={title}
        />
        <Pressable
          style={stl.confirmSplit}
          onPress={() => {
            impactAsync();
            setSplitList([...splitList, title]);
          }}
        >
          <Text style={stl.splitFont}>+</Text>
        </Pressable>
      </View>
    );
  };

  const Split = ({ splitName, index }) => {
    return (
      <View style={[stl.splitContainer, { alignItems: 'center' }]}>
        <Text
          style={[
            stl.splitFont,
            { flex: 1, alignSelf: 'center', marginLeft: 20 },
          ]}
        >
          {splitName}
        </Text>
        <Pressable
          style={stl.confirmSplit}
          onPress={() => {
            Alert.alert('Remove Split?', '', [
              {
                text: 'Yes',
                onPress: () => {
                  impactAsync();
                  setSplitList((prevList) => {
                    const tempList = [...prevList];
                    tempList.splice(index, 1);
                    return tempList;
                  });
                },
              },
              {
                text: 'No',
                onPress: () => impactAsync(),
              },
            ]);
          }}
        >
          <Text style={stl.splitFont}>-</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={stl.container}>
      <MakeSplit />
      <Text style={stl.heading}>Your Splits:</Text>
      <ScrollView style={stl.scroll}>
        {splitList.map((item, index) => (
          <Split
            splitName={item}
            index={index}
            key={index}
          />
        ))}
      </ScrollView>
      <Pressable
        style={stl.clearButton}
        onPress={() => setSplitList([])}
      >
        <Text style={stl.splitFont}>Clear</Text>
      </Pressable>
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  splitContainer: {
    maxWidth: '70%',
    height: 40,
    backgroundColor: sJson.primary,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  splitEntry: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    marginLeft: 10,
    flex: 1,
  },
  splitFont: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: sJson.secondary,
    borderRadius: 10,
    padding: sJson.padding,
    flex: 1,
    maxWidth: 72,
    alignSelf: 'center',
    margin: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  confirmSplit: {
    backgroundColor: 'lightgreen',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },
  clearButton: {
    backgroundColor: sJson.secondary,
    padding: 20,
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
