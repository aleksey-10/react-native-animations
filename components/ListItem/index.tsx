import React, { FC, PropsWithChildren } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { ListItem as ListItemType } from '../../types';
import { usePosition } from './hooks';

interface Props extends ListItemType {
  index: number;
  activeIndex: number | null;
  onPress(): void;
  listSize: number;
  listOffset?: number;
}

const ListItem: FC<PropsWithChildren<Props>> = ({
  title,
  index,
  gradient,
  activeIndex,
  onPress,
  listSize,
  listOffset = 0,
  children,
  titleStyle,
}) => {
  const { height, elementHeight, translateY } = usePosition({
    activeIndex,
    index,
    listSize,
    listOffset,
  });

  const transform = [{ translateY }];

  return (
    <Animated.View style={{ transform, height: elementHeight }}>
      <Pressable onPress={onPress}>
        <LinearGradient
          style={[
            styles.gradient,
            {
              height,
            },
          ]}
          angle={80}
          useAngle
          {...gradient}
        >
          <View style={styles.content}>
            <Text style={[styles.title, titleStyle]} numberOfLines={2}>
              {title}
            </Text>
            {children}
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderTopRightRadius: 64,
  },
  content: {
    flex: 1,
  },
  title: {
    lineHeight: 40,
    paddingVertical: 44,
    paddingHorizontal: 32,
    fontFamily: 'ElMessiri-Regular',
    fontSize: 40,
  },
});

export default ListItem;
