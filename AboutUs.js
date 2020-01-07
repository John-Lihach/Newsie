import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  static navigationOptions = {
    headerTitle: 'About Us',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBox}>
          Newsie is a news app with the goal of keeping people up-to-date in a streamlined manner. All headlines are taken from the Google RSS feed.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 25
  },
  textBox: {
    fontSize: 15,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#d2d4d8',
  },
});