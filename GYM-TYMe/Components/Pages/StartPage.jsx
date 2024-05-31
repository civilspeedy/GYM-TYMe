import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function StartPage() {
  const fade = useRef(new Animated.Value(0)).current;
  const [state, setState] = useState(1);

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

    const fadeOutUpdate = () => {
      fadeOut(() => {
        setState(state + 1);
      });
    };

    if (state < 5) {
      // not triggering correctly
      console.log('updating timer');
      const wait = setTimeout(fadeOutUpdate, 5000);

      return () => clearTimeout(wait);
    }
  }, [state]);

  return (
    <View style={stl.container}>
      {state == 1 ? (
        <Animated.Text style={[stl.text, { opacity: fade }]}>
          Hi there!
        </Animated.Text>
      ) : state == 2 ? (
        <Animated.Text style={[stl.text, { opacity: fade }]}>
          Welcome to GYM TYMe!
        </Animated.Text>
      ) : state == 3 ? (
        <Animated.Text style={[stl.text, { opacity: fade }]}>
          Your personalised fitness companion app.
        </Animated.Text>
      ) : (
        <Animated.Text style={[stl.text, { opacity: fade }]}>
          Lets begin with planning your days...
        </Animated.Text>
      )}
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
