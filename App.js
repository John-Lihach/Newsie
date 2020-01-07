import React, { Component } from 'react';
import SplashScreen from  './Splash.js'
import MainScreen from  './Main.js'
import SettingsScreen from './Settings.js'
import ContactUsScreen from './ContactUs.js'
import AboutUsScreen from './AboutUs.js'
import { StackNavigator } from 'react-navigation';


export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {header: null}
    },
    Main: {
      screen: MainScreen,
      navigationOptions: {headerBackImage: null}
    },
    Settings: {
      screen: SettingsScreen,
    },
    ContactUs: {
      screen: ContactUsScreen,
    },
    AboutUs: {
     screen: AboutUsScreen,
    }
  },
  {
    initialRouteName: 'Splash',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#d2d4d8',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);