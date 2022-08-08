import { useEffect, useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';

const BOOKMARK_OFFSET = 20;

type Args = {
  index: number;
  listSize: number;
  activeIndex: number | null;
  listOffset?: number;
};

export const usePosition = ({
  index,
  listSize,
  activeIndex,
  listOffset = 0,
}: Args) => {
  const { height: windowHeight } = useWindowDimensions();
  const height = windowHeight - listOffset;

  const translateY = useRef(new Animated.Value(height)).current;

  const elementHeight = height / listSize;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: -index * (height / (listOffset ? 5.5 : 7)),
      useNativeDriver: true,
      delay: (index + 1) * 100,
      damping: 700,
    }).start();
  }, []);

  useEffect(() => {
    if (activeIndex !== null && index > 0) {
      const toValue =
        activeIndex >= index
          ? -index * elementHeight + BOOKMARK_OFFSET * index
          : (listSize - index) * (elementHeight - BOOKMARK_OFFSET) -
            BOOKMARK_OFFSET;

      Animated.spring(translateY, {
        toValue,
        useNativeDriver: true,
        delay: ((activeIndex >= index ? index : listSize - index) - 1) * 25,
        damping: 700,
      }).start();
    }
  }, [activeIndex]);

  return {
    elementHeight,
    height: height - index * BOOKMARK_OFFSET,
    translateY,
  };
};
