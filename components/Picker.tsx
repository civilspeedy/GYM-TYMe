import { smoothAnimation } from '@/constants/animations';
import { universalStyle } from '@/constants/styling';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: String;
  options: Array<any>;
};

export default function Picker({ title, options }: Props) {
  const [state, setState] = useState(false);
  return (
    <View style={[universalStyle.object, stl.container]}>
      <Pressable
        onPress={() => {
          setState(!state);
          smoothAnimation();
        }}
      >
        <Text style={universalStyle.text}>Choose {title}</Text>
      </Pressable>
      {state && (
        <View>
          {options.map((item, index) => (
            <Pressable
              key={index}
              style={stl.options}
            >
              <Text style={universalStyle.text}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    width: '70%',
    alignSelf: 'center',
  },
  options: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
  },
});
