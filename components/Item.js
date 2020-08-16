import React from 'react';
import { Text,View,StyleSheet, TouchableOpacity } from 'react-native';

import {itemStyles} from '../styles/Item';

export const Item = ( props ) => {
  return(
    <View style={itemStyles.item}>
      <View style={itemStyles.label}>
        <Text style={itemStyles.text}>{props.category}</Text>
        <Text style={itemStyles.text}>${props.amount}</Text>
      </View>
      <TouchableOpacity style={itemStyles.button}>
        <Text style={itemStyles.buttonText}>X</Text>
      </TouchableOpacity>
    </View>
  )
}
