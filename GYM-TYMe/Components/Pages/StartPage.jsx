import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function StartPage() {
  const fade = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  // look at Animated.Text
  return (
    <View style={stl.container}>
      <Animated.View style={[stl.animContainer, { opacity: fade }]}>
        <Text style={{ color: 'white' }}>Test</Text>
      </Animated.View>
    </View>
  );
}

const stl = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  animContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
