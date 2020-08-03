import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import {Item} from './components/Item';

export default class App extends Component {
  listData = [
    { id: '1', amount: 50, category: 'food'},
    { id: '2', amount: 150, category: 'groceries'},
    { id: '3', amount: 30, category: 'transport'},
  ]
  render() {
    return (
      <SafeAreaView>
        <FlatList 
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={ expense => expense.id }
        />
      </SafeAreaView>
    )
  }
  renderList = ({item}) => (
    <Item amount={item.amount} category={item.category} />
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
  }
})