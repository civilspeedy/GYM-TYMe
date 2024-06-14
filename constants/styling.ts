import { StyleSheet } from 'react-native';
import colours from './colours.json';

export const universalStyle = StyleSheet.create({
  object: {
    backgroundColor: colours.BackgroundTwo,
    padding: 20,
    borderRadius: 10,
  },
  subObject: {
    backgroundColor: colours.BackgroundThree,
    borderColor: colours.BackgroundFour,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
  background: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
});
