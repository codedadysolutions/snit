import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from '../font'
const{width,height}=Dimensions.get('window')

export default class messageComp extends Component {

  render() {
      const{onPressAccept, old, messageData}=this.props
    return (
        <View style={{height:'auto', width: width-20, borderRadius: 10, backgroundColor: '#DDD8F5', marginVertical: 10}}>
            <View style={{height: 50, borderBottomWidth: 1, borderColor: 'white', flexDirection:'row'}}>

                    <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20}}>
                        <Text style={{color: '#3A4277', fontSize: 15, fontFamily: Font.FONT_FAMILY_BOLD}}>Message from Authority</Text>
                    </View>

            </View>

            <View style={{height: 'auto',justifyContent: 'center', padding:20}}>
                <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>{messageData}</Text>
            </View>        

    </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex:1,
    }
});