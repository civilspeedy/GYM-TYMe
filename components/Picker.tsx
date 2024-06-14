import { smoothAnimation } from '@/constants/animations';
import { normalImpact } from '@/constants/haptics';
import { universalStyle } from '@/constants/styling';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: String;
  options: Array<any>;
};

export default function Picker({ title, options }: Props): React.JSX.Element {
  const [pickerTitle, setPickerTitle] = useState('Choose ' + title);
  const [state, setState] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {}, [value]);

  const handleOptionPress = (option: any) => {
    normalImpact();
    setValue(option);
    setState(!state);
    setPickerTitle(option);
    smoothAnimation();
  };

  return (
    <View style={[universalStyle.object, stl.container]}>
      <Pressable
        onPress={() => {
          normalImpact();
          setState(!state);
          smoothAnimation();
        }}
      >
        <Text style={universalStyle.text}>{pickerTitle}</Text>
      </Pressable>
      {state && (
        <ScrollView>
          {options.map((item, index) => (
            <Pressable
              key={index}
              style={universalStyle.subObject}
              onPress={() => handleOptionPress(item)}
            >
              <Text style={universalStyle.text}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    width: '60%',
    alignSelf: 'center',
  },
});
