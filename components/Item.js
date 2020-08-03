import React from 'react';
import { Text,View,StyleSheet } from 'react-native';

export const Item = ( props ) => {
  return(
    <View style={itemStyles.item}>
      <Text style={itemStyles.text}>{props.category}</Text>
      <Text style={itemStyles.text}>{props.amount}</Text>
    </View>
  )
}

const itemStyles = StyleSheet.create({
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