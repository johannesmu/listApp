import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native'
// third party components
import RNPickerSelect from 'react-native-picker-select'
// custom components
import { Item } from './components/Item'

export default class App extends Component {
  state = {
    expenseAmount: 0,
    selectedCategory: '',
    submitting: false,
  }

  listData = []

  dropdownItems = [
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Grocery', value: 'grocery' },
    { label: 'Utility', value: 'utility' },
    { label: 'Fuel', value: 'fuel' },
    { label: 'Rent', value: 'rent' },
  ]

  render() {
    return (
      <SafeAreaView>
        <View style={styles.main}>
          <Text>Add your expense</Text>
          <TextInput
            style={styles.input}
            placeholder="$ amount"
            onChangeText={(text) =>
              this.setState({ expenseAmount: parseFloat(text) }, () => {this.verifyInput()} )
            }
            keyboardType="number-pad"
            // ref is used to create reference to this component
            ref={(exp) => (this._input = exp)}
          />
          {/* <TextInput
          style={styles.input}
          placeholder="category"
          onChangeText={ text => this.setState({ expenseCategory: text }) }
        /> */}
          <RNPickerSelect
            onValueChange={(value) => {
              this.setState({ selectedCategory: value }, () => {this.verifyInput()} )
            }}
            items={this.dropdownItems}
            style={picker}
            value={this.state.selectedCategory}
            placeholder={placeholder}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        {/* wrap the button in view */}
        <View style={styles.main}>
          <TouchableOpacity 
            style={ this.state.submitting ? styles.button : styles.buttonDisabled } 
            onPress={this.addItem} 
            disabled={ !this.state.submitting ? true : false }>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={(item) => item.id}
          extraData={this.state.expenseAmount}
        />
      </SafeAreaView>
    )
  }
  renderList = ({ item }) => (
    <Item amount={item.amount} category={item.category} />
  )
  addItem = () => {
    if (
      isNaN(this.state.expenseAmount) ||
      this.state.expenseAmount == 0 ||
      this.state.selectedCategory == ''
    ) 
    {
      return
    }
    let itemId = new Date().getTime().toString()
    let listItem = {
      id: itemId,
      amount: this.state.expenseAmount,
      category: this.state.selectedCategory,
    }
    this.listData.push(listItem)
    this.setState({ expenseAmount: 0, selectedCategory: null, submitting: false })
    // we use the ref in TextInput to clear and focus it
    this._input.clear()
    this._input.focus()
  }

  verifyInput = () => {
    // verify if input and dropdown have value, then change submitting state
    if( this.state.expenseAmount > 0 && this.state.selectedCategory ) {
      this.setState({submitting: true})
    }
  }
}

// theme colors
const colors = {
  primary: 'hsla(330, 38%, 65%, 1)',
  primaryDisabled: 'hsla(330, 38%, 80%, 1)',
}
//default for dropdown
const placeholder = { label: 'pick a type', value: null, color: 'black' }


const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 15,
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary,
    marginVertical: 15,
  },
  buttonDisabled: {
    padding: 10,
    backgroundColor: colors.primaryDisabled,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})

const picker = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    minWidth: '100%',
  },
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingRight: 30,
  },
})
