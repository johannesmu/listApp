import {StyleSheet} from 'react-native';
import {colors} from './Colors';

export const itemStyles = StyleSheet.create({
  item : {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight:10,
    flex:1,
  },
  text: {
    fontSize: 16,
    color: 'black'
  },
  button: {
    padding: 5,
    width:30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: '#666666',
  }
})