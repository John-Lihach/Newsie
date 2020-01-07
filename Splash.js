import React, { Component } from 'react';
import {  View, StyleSheet, Image } from 'react-native';
import TimerCountdown from 'react-native-timer-countdown'

class SplashScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Loading...',
  };

  state = {finished: false};

  render() {
    return (
        <View style={styles.container}>
          <Image source={require('./newsIcon.png')} style={styles.icon}>
          </Image >
          <TimerCountdown
            initialSecondsRemaining={4000}
            onTick={() => console.log('tick')}
            onTimeElapsed={() => this.props.navigation.navigate('Main')}
            allowFontScaling={true}
            style={{ fontSize: 0 }}
          />
      </View>
    );
  }
}
export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  icon:{
    flex:1,
    width: '90%', 
    height: '100%',
    resizeMode: 'contain'
  },

});