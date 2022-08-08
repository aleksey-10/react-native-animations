import { useNavigation } from '@react-navigation/native';
import React, { FC, memo, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { Article } from '../../types';
import { useAnimation } from './hooks';

const CARD_BORDER_RADIUS = 24;

const Preview: FC<Article & { disabled?: boolean }> = ({
  description,
  img,
  title,
  disabled = true,
  id,
}) => {
  const navigation = useNavigation();
  const wrapperRef = useRef<View>();
  const [active, setActive] = useState<boolean>(false);
  const { height: windowHeight } = useWindowDimensions();

  const transition = useAnimation(active, setActive);

  const handlePress = () => {
    wrapperRef.current?.measureInWindow((x, y) => {
      Animated.spring(transition, {
        toValue: {
          y: -y - 50,
          x: 1,
        },
        useNativeDriver: false,
        damping: 700,
      }).start();
    });

    setActive(true);
    navigation.navigate('Details', { id });
  };

  const interpolateProperty = (outputRange: number[] | string[]) => {
    return transition.x.interpolate({
      inputRange: [0, 1],
      outputRange,
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY: transition.y },
            { scale: interpolateProperty([1, 1.2]) },
          ],
          height: windowHeight / 2.15,
        },
      ]}
      ref={wrapperRef}
    >
      <Pressable onPress={handlePress} disabled={disabled}>
        <ImageBackground
          resizeMode="cover"
          source={{ uri: img }}
          style={styles.imageWrapper}
          imageStyle={styles.image}
        >
          <Animated.View
            style={[
              styles.gradientWrapper,
              {
                opacity: interpolateProperty([1, 0]),
              },
            ]}
          >
            <LinearGradient
              colors={['#e6bfe500', '#e6bfe5']}
              locations={[0.25, 0.65]}
              style={styles.gradient}
            />
          </Animated.View>
          <View style={styles.bottom}>
            <Animated.Text
              style={[
                styles.title,
                {
                  color: interpolateProperty([
                    'rgb(0, 0, 0)',
                    'rgb(255, 255, 255)',
                  ]),
                  transform: [
                    { translateY: interpolateProperty([0, -20]) },
                    { translateX: interpolateProperty([0, 20]) },
                  ],
                  fontSize: interpolateProperty([32, 40]),
                },
              ]}
            >
              {title}
            </Animated.Text>
            <Animated.Text style={{ opacity: interpolateProperty([1, 0]) }}>
              {description}
            </Animated.Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageWrapper: {
    height: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  image: {
    borderRadius: CARD_BORDER_RADIUS,
  },
  gradientWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 360,
    alignItems: 'stretch',
  },
  gradient: {
    height: '100%',
    borderBottomLeftRadius: CARD_BORDER_RADIUS,
    borderBottomRightRadius: CARD_BORDER_RADIUS,
  },
  bottom: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'ElMessiri-Regular',
  },
});

export default memo(Preview);
