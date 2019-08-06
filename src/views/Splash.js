import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import posed from 'react-native-pose';


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
        anim2: null
    }

componentDidMount(){
    this.splashfn()
}

splashfn=()=>{
    setTimeout(()=>{this.props.navigation.navigate('Login')}, 2000);
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
