import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import posed from 'react-native-pose';
import { TextInput } from 'react-native-gesture-handler';
import Font from '../font'

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
        username: '',
        password:''
    }

// componentDidMount(){
//     this.splashfn()
// }

// splashfn=()=>{
//     this.setState({isOpen:false, anim: 'visible'},()=>this.setState({anim2: 'moveup'}))
// }

// animFn=(anim)=>{

// }

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
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={{height: 60, width: width-40, backgroundColor: 'white', borderWidth: 3, borderColor: '#3A4277', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>LOG IN</Text>
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
