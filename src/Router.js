import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, Dimensions, AsyncStorage} from 'react-native';
import { createAppContainer,createStackNavigator } from "react-navigation";
import Splash from './views/Splash'
import Login from './views/Login'


const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: () => ({
            header: null
          }),
      },
      Login: {
        screen: Login,
        navigationOptions: () => ({
            header: null
          }),
      }
  });

  export default createAppContainer(AppNavigator);
