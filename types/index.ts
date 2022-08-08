import type { StyleProp, TextStyle } from 'react-native';
import type { LinearGradientProps } from 'react-native-linear-gradient';

export interface ListItem {
  id: number;
  title: string;
  gradient: LinearGradientProps;
  titleStyle?: StyleProp<TextStyle>;
}

export interface Article extends Omit<ListItem, 'gradient'> {
  description: string;
  img: string;
  list: ListItem[];
}

export interface Item extends ListItem {
  gradient: LinearGradientProps;
  articles: Article[];
}
