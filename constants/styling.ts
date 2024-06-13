import { StyleSheet } from 'react-native';
import colours from './colours.json';

export const universalStyle = StyleSheet.create({
  object: {
    backgroundColor: colours.BackgroundTwo,
    padding: 20,
    borderRadius: 10,
  },
  background: {
    backgroundColor: colours.BackgroundOne,
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
});
