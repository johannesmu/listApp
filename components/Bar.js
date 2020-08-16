import React from 'react';
import { Text,View,StyleSheet, ImagePropTypes } from 'react-native';

export const Bar = (props) => {
  return (
    <View style={[ styles.bar, props.style ]}>
      <Text style={props.textStyle}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 15
  }
})