import {StyleSheet,Platform} from 'react-native';
import {colors} from './Colors';

export const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    // using Platform module: if android, add 25 to clear the status bar
    paddingTop: Platform.OS == 'android' ? 25 : 0,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    marginVertical: 15,
  },
  buttonView: {
    paddingHorizontal: 10,
  },
  button: {
    padding: 15,
    backgroundColor: colors.primary,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonDisabled: {
    padding: 15,
    backgroundColor: colors.primaryDisabled,
    marginVertical: 15,
  },
  listView: {
    flex: 1,
  },
})