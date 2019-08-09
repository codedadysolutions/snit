import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, Dimensions, AsyncStorage} from 'react-native';
import { createAppContainer,createStackNavigator } from "react-navigation";
import Splash from './views/Splash'
import Login from './views/Login'
import Home from './views/Home'
import Notification from './views/Notification'
import LeaveRequest from './views/LeaveRequest'
import Subs from './views/Subs'
import History from './views/History'
import Chat from './views/Chat'


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
      },
      Home: {
        screen: Home,
        navigationOptions: () => ({
            header: null
          }),
      },
      Notification: {
        screen: Notification,
        navigationOptions: () => ({
            header: null
          }),
      },
    LeaveRequest: {
        screen: LeaveRequest,
        navigationOptions: () => ({
            header: null
          }),
      },
      History: {
        screen: History,
        navigationOptions: () => ({
            header: null
          }),
      },
      Chat: {
        screen: Chat,
        navigationOptions: () => ({
            header: null
          }),
      }
  });

  export default createAppContainer(AppNavigator);
