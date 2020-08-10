import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
// third-party components
import RNPickerSelect from 'react-native-picker-select';
// custom components
import {Item} from './components/Item';

export default class App extends Component {
  state = {
    expenseAmount : 0,
    expenseCategory: '',
  }
  listData = []

  dropdownItems = [
    { label: 'Food' , value: 'food' },
    { label: 'Transport' , value: 'transport' },
    { label: 'Rent' , value: 'rent' },
    { label: 'Grocery' , value: 'grocery' },
    { label: 'Entertainment' , value: 'entertainment' },
  ]

  render() {
    return (
      <SafeAreaView >
        <View style={styles.main}>
        <Text>Add your expense</Text>
        <TextInput 
          style={styles.input}
          placeholder="$ amount" 
          onChangeText={ text => this.setState({expenseAmount: parseFloat(text) }) } 
          keyboardType="number-pad" />
        {/* <TextInput
          style={styles.input}
          placeholder="category"
          onChangeText={ text => this.setState({ expenseCategory: text }) }
        /> */}
          <RNPickerSelect 
            items = { this.dropdownItems }
            value = { this.state.expenseCategory }
            onValueChange = { value => this.setState({expenseCategory: value}) }
            useNativeAndroidPickerStyle = {false}
          />
        </View>
        {/* wrap the button in view */}
        <View>
          <TouchableOpacity  style={styles.button} onPress= {this.addItem}>
            <Text style={styles.buttonText} >Add</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList 
          data = {this.listData}
          renderItem = { this.renderList }
          keyExtractor = { item => item.id }
          extraData = {this.state.expenseAmount}
        />
      </SafeAreaView>
    )
  }
  renderList = ({item}) => (
    <Item amount={item.amount} category={item.category} />
  )
  addItem = () => {
    if( 
      isNaN(this.state.expenseAmount) || 
      this.state.expenseAmount == 0 || 
      this.state.expenseCategory == '' ) {
      return;
    }
    let itemId = new Date().getTime().toString()
    let listItem = {
      id: itemId,
      amount: this.state.expenseAmount,
      category: this.state.expenseCategory
    }
    this.listData.push(listItem)
    this.setState({expenseAmount:0})
  }
}
const colors = {
  primary : 'hsla(330, 38%, 65%, 1)'
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
  },
  button: {
    padding: 15,
    backgroundColor: colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
})