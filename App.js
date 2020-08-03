import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, Button } from 'react-native';

import {Item} from './components/Item';

export default class App extends Component {
  state = {
    expenseAmount : 0,
    expenseCategory: ''
  }
  listData = [
    
  ]
  render() {
    return (
      <SafeAreaView>
        <Text>Add your expense</Text>
        <TextInput 
          style={styles.input}
          placeholder="$ amount" 
          onChangeText={ text => this.setState({expenseAmount: parseFloat(text) }) } 
          keyboardType="number-pad" />
        <TextInput
          style={styles.input}
          placeholder="category"
          onChangeText={ text => this.setState({ expenseCategory: text }) }
        />
        <Button title="Add" onPress={this.addItem()} />
        <FlatList 
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={ expense => expense.id }
          extraData={this.state.expenseAmount}
        />
      </SafeAreaView>
    )
  }
  renderList = ({item}) => (
    <Item amount={item.amount} category={item.category} />
  )
  addItem = () => {
    if( isNaN(this.state.expenseAmount) || this.state.expenseAmount == 0 ) {
      return;
    }
    let itemId = new Date().getTime().toString()
    let item = {
      id: itemId,
      amount: this.state.expenseAmount,
      category: this.state.expenseCategory
    }
    this.listData.push(item)
    this.setState({expenseAmount:0})
  }
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 15
  }
})