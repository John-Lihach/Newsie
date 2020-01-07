import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';


export default class App extends React.Component {
  static navigationOptions = {
    headerTitle: 'Contact Us',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoItem}>E-mail: newsie@newsieCo.com</Text>
        <Text style={styles.infoItem}>Phone Number: 703-123-4567</Text>
        <Text style={styles.infoItem}>Address: 1234 S Road, Arlington, VA</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 80,
  },
  infoItem: {
    padding: 10,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#d2d4d8',
    borderRadius: 20,
  },
});