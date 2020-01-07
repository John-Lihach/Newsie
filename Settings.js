import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Constants } from 'expo';

class TextButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.onPress();}} style={styles.button}>
        <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}

export default class App extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextButton name="Contact Us" onPress={() => this.props.navigation.navigate('ContactUs')}/>
        <TextButton name="About Us" onPress={() => this.props.navigation.navigate('AboutUs')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  button: {
    padding: 10,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#5aa1e1',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
  }
});