import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = (
  active: boolean,
  setActive: (value: boolean) => void,
) => {
  const navigation = useNavigation();
  const transition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    if (active) {
      navigation.addListener('state', ({ data }) => {
        const isDetailsOpen = data.state.routes.some(
          ({ name }) => name === 'Details',
        );

        if (!isDetailsOpen) {
          setActive(false);
          Animated.timing(transition, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: false,
          }).start();
        }
      });
    }
  }, [navigation, active, transition, setActive]);

  return transition;
};
