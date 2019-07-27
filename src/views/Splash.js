import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Splash extends Component {

componentDidMount(){
    // this.splashfn()
}

splashfn=()=>{
    setTimeout(()=>{this.props.navigation.navigate('Login')}, 3000);
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
