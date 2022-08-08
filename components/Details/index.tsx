import { useRoute } from '@react-navigation/native';
import React, { FC, useMemo, useState } from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import data from '../../data';
import ListItem from '../ListItem';

type Props = {
  activeDataIndex: number | null;
};

const Details: FC<Props> = ({ activeDataIndex }) => {
  const route = useRoute();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { height: windowHeight } = useWindowDimensions();

  const article = useMemo(() => {
    const dataItem = activeDataIndex && data[activeDataIndex];

    if (dataItem && route.params) {
      const foundArticle = dataItem.articles.find(
        ({ id }) => route.params?.id === id,
      );

      if (foundArticle) {
        return foundArticle;
      }
    }

    return null;
  }, [activeDataIndex, route.params]);

  const offset = windowHeight * 0.33;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={article?.list.map(item => ({ ...item, key: item.id }))}
        renderItem={({ item, index }) => (
          <ListItem
            {...item}
            titleStyle={[item.titleStyle, styles.titleStyle]}
            index={index}
            activeIndex={activeIndex}
            onPress={() => setActiveIndex(index)}
            listSize={data.length}
            listOffset={offset}
          >
            <ImageBackground
              source={{
                uri: 'https://i.picsum.photos/id/724/600/400.jpg?hmac=xg4QGRO-6jwcg3etPQBPvU63T8zqTVei2j5qVcZeW7U',
              }}
              style={[styles.imgWrapper, { height: windowHeight / 3.4 }]}
              imageStyle={styles.img}
              resizeMode="contain"
            />
          </ListItem>
        )}
        style={[styles.list]}
        contentContainerStyle={{
          transform: [{ translateY: offset }],
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: '100%',
  },
  imgWrapper: {
    marginBottom: 40,
  },
  img: {
    marginHorizontal: 20,
    borderRadius: 24,
  },
  titleStyle: {
    fontSize: 36,
    paddingTop: 32,
    paddingBottom: 16,
  },
});

export default Details;
