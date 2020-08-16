import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native'
// third-party components
import RNPickerSelect from 'react-native-picker-select'
// custom components
import { Item } from './components/Item'
// stylesheets
import {styles} from './styles/Main';
import {pickerStyle} from './styles/Picker';

export default class App extends Component {
  state = {
    expenseAmount: 0,
    expenseCategory: '',
    validInput: false,
  }

  listData = []

  dropdownItems = [
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Rent', value: 'rent' },
    { label: 'Grocery', value: 'grocery' },
    { label: 'Entertainment', value: 'entertainment' },
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
              this.setState({ expenseAmount: parseFloat(text) }, () => {
                this.validate()
              })
            }
            keyboardType="number-pad"
            ref={(input) => (this._textInput = input)}
          />
          <RNPickerSelect
            items={this.dropdownItems}
            value={this.state.expenseCategory}
            onValueChange={(value) =>
              this.setState({ expenseCategory: value }, () => {
                this.validate()
              })
            }
            useNativeAndroidPickerStyle={false}
            style={pickerStyle}
            placeholder={pickerPlaceholder}
          />
        </View>
        {/* wrap the button in view */}
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={
              [
                this.state.validInput ? styles.button : styles.buttonDisabled,
                {borderRadius: 10}
              ]
            }
            onPress={this.addItem}
            disabled={!this.state.validInput ? true : false}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={this.listData}
            renderItem={this.renderList}
            keyExtractor={(item) => item.id}
            extraData={this.state.expenseAmount}
          />
        </View>
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
      this.state.expenseCategory == ''
    ) {
      return
    }
    let itemId = new Date().getTime().toString()
    let listItem = {
      id: itemId,
      amount: this.state.expenseAmount,
      category: this.state.expenseCategory,
    }
    this.listData.push(listItem)
    this.setState({
      expenseAmount: 0,
      expenseCategory: null,
      validInput: false,
    })
    this._textInput.clear()
    this._textInput.focus()
  }

  validate = () => {
    if (this.state.expenseAmount > 0 && this.state.expenseCategory) {
      this.setState({ validInput: true })
    }
  }
}

const pickerPlaceholder = {
  label: 'select category',
  value: null,
  color: 'black',
}

