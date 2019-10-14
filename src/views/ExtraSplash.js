import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import posed from 'react-native-pose';
import axios from 'axios'
import baseurl from '../data'
import firebase from 'react-native-firebase'
import font from '../font';

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
    this._retrieveData()
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
                    this.setState({data: response.data.results, leaveData: response.data.results[0].leave, notificationData:response.data.results[0].notification})
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
        <View style={{flexDirection: 'row', marginTop: 20}}>
        <ActivityIndicator size={'small'} color='#3A4277' />
        <Text style={{fontSize: 10, fontFamily: font.FONT_FAMILY_SEMI, color: '#3A4277', marginLeft: 10}}>Please Wait, Fetching your data.</Text>
        </View>
        
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
