import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import posed from 'react-native-pose';
import { TextInput } from 'react-native-gesture-handler';
import Font from '../font'
import data from '../data'
import axios from 'axios'


const {height, width} = Dimensions.get('window')

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

export default class Login extends Component {

    state={
        // isOpen:true, 
        // anim: null,
        // anim2: null
        username: 'faculty1',
        password:'123123', 
        loader: false
    }

// componentDidMount(){
//     this.splashfn()
// }

// splashfn=()=>{
//     this.setState({isOpen:false, anim: 'visible'},()=>this.setState({anim2: 'moveup'}))
// }

// animFn=(anim)=>{

// }
_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // We have data!!
        this.setState({loader: false})
        this.props.navigation.navigate('ExtraSplash')
        
        console.log(value);

      }
    } catch (error) {
      // Error retrieving data
    }
  };

_storeData = async (token) => {
    try {
      await AsyncStorage.setItem('@token', token);
      this._retrieveData()
    } catch (error) {
      // Error saving data
      Alert.alert(
        'Something went wrong!',
        'There was an error while creating login, Please try again.',
        [

          {text: 'OK', onPress: () => this.setState({loader: false})},
        ],
        {cancelable: false},
      );
    }
  };

onPressLogin=()=>{

  this.setState({loader: true})

    if(this.state.username.length < 3){
        Alert.alert(
            'Username error',
            'Please provide a valid username',
            [
              {text: 'OK', onPress: () => this.setState({loader: false})},
            ],
            {cancelable: false},
          );
    }
    else if(this.state.password.length < 6){
        Alert.alert(
            'Password error',
            'Please provide a valid password',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () =>this.setState({loader: false})},
            ],
            {cancelable: false},
          );
    }
    else{
        var that = this
        const formData = new FormData()
        formData.append('username',this.state.username );
        formData.append('password',this.state.password );
    
    
        // axios.defaults.withCredentials = true
    
        axios.post('http://34.66.149.252/login/', formData,{
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                // }
                // headers:{
                //     'xsrfCookieName': 'XCSRF-TOKEN',
                //     'xsrfHeaderName': 'X-CSRFTOKEN',
                //     //'Access-Control-Allow-Origin':'*',
                //     // 'Accept': 'application/json',
                //     // 'Content-Type': 'application/json',
                // },
        })
        .then(response => { 
            console.log("LOGIN",response.data)
        //    this.props.navigation.navigate('Home')
        if(response.data.Status){
          this._storeData(response.data.Token)
        }else{
          Alert.alert(
            'Login Error',
            'Please provide valid credentials',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () =>this.setState({loader: false})},
            ],
            {cancelable: false},
          );
        }
        
    
        })
        .catch(error => {
            console.warn(error.response.data)
            this.setState({loader: false})
        });    
    }
}

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={{flex:1}} ref={(ref)=>this.ScrollView=ref}>
       <View style={{height: height/3+100, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/logo.png')} style={{height: 2252/13, width:1922/13}}/>
       </View>
       <View style={{flex:1}}>
            <View style={{height: 80, width: width-40, justifyContent: 'center'}}>
                <View style={{height: 60, backgroundColor: '#3A4277', borderRadius: 10, justifyContent: 'center'}}>
                    <TextInput
                    style={{fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI, paddingHorizontal: 20, color:'white'}}
                    placeholder='Username'
                    placeholderTextColor='white'
                    onChangeText={(text)=>this.setState({username: text})}
                    value={this.state.username}
                    />
                </View>
            </View>
            <View style={{height: 80, width: width-40, justifyContent: 'center'}}>
                <View style={{height: 60, backgroundColor: '#3A4277', borderRadius: 10, justifyContent: 'center'}}>
                <TextInput
                    style={{fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI, paddingHorizontal: 20,color:'white'}}
                    placeholder='Password'
                    placeholderTextColor='white'
                    onChangeText={(text)=>this.setState({password: text})}
                    value={this.state.password}
                    onFocus={()=>this.ScrollView.scrollToEnd()}
                    />
                </View>
            </View>
            <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>this.onPressLogin()} style={{height: 60, width: width-40, backgroundColor: 'white', borderWidth: 3, borderColor: '#3A4277', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                      {this.state.loader ? <ActivityIndicator size={'small'} color='#3A4277' /> : <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>LOG IN</Text>}
                </TouchableOpacity>
            </View>
       </View>
       </ScrollView>
      </SafeAreaView>
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
