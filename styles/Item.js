import {StyleSheet} from 'react-native';
import {colors} from './Colors';

export const itemStyles = StyleSheet.create({
  item : {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    color: 'black'
  }
})