import React from 'react';
import { Text,View,StyleSheet } from 'react-native';

import {itemStyles} from '../styles/Item';

export const Item = ( props ) => {
  return(
    <View style={itemStyles.item}>
      <Text style={itemStyles.text}>{props.category}</Text>
      <Text style={itemStyles.text}>{props.amount}</Text>
    </View>
  )
}
