import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, Dimensions, AsyncStorage} from 'react-native';
import { createAppContainer,createStackNavigator, createSwitchNavigator } from "react-navigation";
import Splash from './views/Splash'
import Login from './views/Login'
import Home from './views/Home'
import Notification from './views/Notification'
import LeaveRequest from './views/LeaveRequest'
import LeaveRequestSub from './views/LeaveRequestSub'
import Subs from './views/Subs'
import History from './views/History'
import Chat from './views/Chat'
import ExtraSplash from './views/ExtraSplash'

const AppNavigator = createSwitchNavigator({
  Welcome:{
    screen: createStackNavigator({
      Splash: {
        screen: Splash,
        navigationOptions: ({ navigation }) => ({
          header: null,
        }),
      },
      Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
          header: null,
        }),
      },
      ExtraSplash: {
        screen: ExtraSplash,
        navigationOptions: ({ navigation }) => ({
          header: null,
        }),
      },
    }),
  },

  Main:{
    screen: createStackNavigator({
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
      LeaveRequestSub: {
        screen: LeaveRequestSub,
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
    })
  }
})


export default createAppContainer(AppNavigator);

// import React, { Component } from 'react';
// import { View, Text,AsyncStorage } from 'react-native';
// import firebase from 'react-native-firebase'

// export default class Router extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //     };
// //   }
//   async getToken() {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     console.log("fcm",fcmToken)
//     if (!fcmToken) {
//         fcmToken = await firebase.messaging().getToken();
//         console.warn(fcmToken)
//         if (fcmToken) {
//             await AsyncStorage.setItem('fcmToken', fcmToken);
//         }
//     }
// }

// async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     console.warn(enabled)
//     if (enabled) {
//         this.getToken();
//     } else {
//         this.requestPermission();
//     }
// }

// async requestPermission() {
//     try {
//         await firebase.messaging().requestPermission();
//         this.getToken();
//     } catch (error) {
//         console.log('permission rejected');
//     }
// }

// async createNotificationListeners() {
//     firebase.notifications().onNotification(notification => {
//         notification.android.setChannelId('snit').setSound('default')
//         firebase.notifications().displayNotification(notification)
//     });
// }

// componentDidMount() {
//   console.warn("checking")
//     const channel = new firebase.notifications.Android.Channel('snit', 'insider channel', firebase.notifications.Android.Importance.Max)
//     firebase.notifications().android.createChannel(channel);
//     this.checkPermission();
//     this.createNotificationListeners();
// }
//   render() {
//     return (
//       <View>
//         <Text> Router </Text>
//       </View>
//     );
//   }
// }
