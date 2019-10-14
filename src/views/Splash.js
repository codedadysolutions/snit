import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import posed from 'react-native-pose';
import axios from 'axios'

import firebase, { Notification, NotificationOpen } from 'react-native-firebase'
// import type { Notification, NotificationOpen } from 'react-native-firebase';assemble
import baseurl from '../data' 

const PosImage = posed.Image({
    visible:{
            delay: 300,
            opacity: 1,
            transition: {
                opacity: { ease: 'easeIn', duration: 200},
            },
    },
    open: { opacity: 1, 
            delay: 0,
            transition: {
                opacity: { ease: 'easeOut', duration: 300 },
                default: { ease: 'linear', duration: 500 }
            }
        },
    moveup: { y: -200, opacity: 1, delay: 300,
        transition: { duration: 1000}
     }
  });

export default class Splash extends Component {

    state={
        fcmToken:''
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("fcm",fcmToken)
        // this.tokenUpdate(fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.warn(fcmToken)
            if (fcmToken) {
                // this.tokenUpdate(fcmToken)
                await AsyncStorage.setItem('fcmToken', fcmToken);
                console.warn("TOKEN UPDATED", fcmToken)
            }
        }
    }
    
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        console.warn(enabled)
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    
    async createNotificationListeners() {
        firebase.notifications().onNotification(notification => {
            const badgeCount = firebase.notifications().getBadge();
            console.warn("BADGE ",badgeCount)
            notification.android.setChannelId('snit').setSound('default')
            firebase.notifications().displayNotification(notification)
            firebase.notifications().setBadge(2);
        });
    }

    async readNotification(){
        firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            this.props.navigation.navigate('Notification')
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification
        });
    }


    // tokenUpdate=(fcmToken)=>{
    //     const formData = new FormData()
    //     formData.append('token', fcmToken)

    //     axios.post(baseurl+`/snit/update-token/`, formData,{
    //         headers: {
    //             'Content-type': 'multipart/form-data',
    //             'Authorization': 'Token '+ this.state.token
    //         }
    //     })
    //     .then(response => {
    //         console.warn("TOKEN SEND", response.data)
    //     })
    //     .catch(error => {
    //         Alert.alert(
    //             'Error',
    //             'Something went wrong',
    //             [
    //               {text: 'OK', onPress: () => console.warn("WRONG")},
    //             ],
    //             {cancelable: false},
    //           );
    //     });
    // }




    state={
        isOpen:true, 
        anim: null,
        anim2: null,
        login: false,
        token:'',
        data:[],
        leaveData:[],
        notificationData:[]
    }

componentDidMount(){
    // BadgeAndroid.setBadge(10);
    this.props.navigation.addListener(
        'willFocus',
        payload => {
        //   console.warn('willFocus', payload);
        this._retrieveData()
        const channel = new firebase.notifications.Android.Channel('snit', 'insider channel', firebase.notifications.Android.Importance.Max)
        firebase.notifications().android.createChannel(channel);
        this.checkPermission();
        this.readNotification()
        this.createNotificationListeners(); 
        }
      );
}


_retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
        // We have data!!
        this.setState({login: true, token: value },()=> {
                axios.get(baseurl+'/snit/dash-board/',{
                        headers: {
                            'Content-type': 'multipart/form-data',
                            'Authorization': 'Token '+ this.state.token
                        }
                })
                .then(response => {
                    console.log(response.data.results)
                    this.setState({data: response.data.results, leaveData: response.data.results[0].leave, notificationData:response.data.results[0].notification},()=> {
                        this.getToken()
                    })
                    this.splashfn()
                })
                .catch(error => {
                        console.warn(error)
                });
        })
        console.log(value);
        }else{
            this.setState({login: false}, ()=> this.splashfn())
            }
    } catch (error) {
        console.warn("ERROR")
    }
    };


splashfn=()=>{
    setTimeout(()=>{
        if(this.state.login){
            this.props.navigation.navigate('Home', {apiData: this.state.data, leaveData:this.state.leaveData, nData: this.state.notificationData, token: this.state.token})
        }else{
            this.props.navigation.navigate('Login')
        }
    }, 3000);
}

animFn=(anim)=>{

}

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* <Text> Splash </Text> */}
        <Image source={require('../assets/logo.png')} style={{height: 2252/15, width:1922/15}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
