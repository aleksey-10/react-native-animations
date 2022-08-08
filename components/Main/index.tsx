import React, { FC } from 'react';
import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import data from '../../data';
import ListItem from '../ListItem';
import Preview from '../Preview';

type Props = {
  activeIndex: number | null;
  setActiveIndex(value: number): void;
};

const Main: FC<Props> = ({ activeIndex, setActiveIndex }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={data.map(item => ({ ...item, key: item.id }))}
        renderItem={({ item, index }) => (
          <ListItem
            {...item}
            index={index}
            activeIndex={activeIndex}
            onPress={() => setActiveIndex(index)}
            listSize={data.length}
          >
            <Animated.FlatList
              data={item.articles.map(article => ({
                ...article,
                key: article.id,
              }))}
              renderItem={({ item: article }) => (
                <Preview {...article} disabled={activeIndex !== index} />
              )}
            />
          </ListItem>
        )}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  list: {
    width: '100%',
    height: '100%',
  },
});

export default Main;
