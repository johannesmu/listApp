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
    validInput: false,
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
          onChangeText={ text => this.setState({expenseAmount: parseFloat(text) },
            () => { this.validate() }
          ) } 
          keyboardType="number-pad" 
          ref={(input) => ( this._textInput = input )}/>
        {/* <TextInput
          style={styles.input}
          placeholder="category"
          onChangeText={ text => this.setState({ expenseCategory: text }) }
        /> */}
          <RNPickerSelect 
            items = { this.dropdownItems }
            value = { this.state.expenseCategory }
            onValueChange = { value => this.setState({expenseCategory: value},
              () => { this.validate() }
            ) }
            useNativeAndroidPickerStyle = {false}
            style={pickerStyle}
            placeholder={pickerPlaceholder}
          />
        </View>
        {/* wrap the button in view */}
        <View>
          <TouchableOpacity 
            style={ this.state.validInput ? styles.button : styles.buttonDisabled } 
            onPress= {this.addItem}
            disabled = { !this.state.validInput ? true : false}
          >
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
    this.setState({expenseAmount:0, expenseCategory: null, validInput: false })
    this._textInput.clear()
    this._textInput.focus()
  }

  validate = () => {
    if( this.state.expenseAmount > 0 && this.state.expenseCategory ) {
      this.setState({validInput:true})
    }
  }
}

const colors = {
  primary : 'hsla(330, 38%, 65%, 1)',
  primaryDisabled: 'hsla(330, 38%, 80%, 1)',
}

const pickerPlaceholder = {
  label: 'select category', value: null, color: 'black'
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
    backgroundColor: colors.primary,
    marginVertical: 15
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  buttonDisabled: {
    padding: 15,
    backgroundColor: colors.primaryDisabled,
    marginVertical: 15,
  },
})

const pickerStyle = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  inputAndroid: {
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  }
})