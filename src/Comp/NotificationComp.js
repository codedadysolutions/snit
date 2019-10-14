import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from '../font'
const{width,height}=Dimensions.get('window')

export default class NotificationComp extends Component {

  render() {
      const{assign,onPressReject, onPressAccept, old, from, normal, period, message, status }=this.props
    return (
        <View style={{height: old ? 110 : 160, width: width-20, borderRadius: 10, backgroundColor: '#DDD8F5', marginVertical: 10}}>
            <View style={{height: 50, borderBottomWidth: 1, borderColor: 'white', flexDirection:'row'}}>

                    <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20}}>
                        { normal ?  <Text style={{color: '#3A4277', fontSize: 15, fontFamily: Font.FONT_FAMILY_BOLD}}>Normal Notification</Text> : <Text style={{color: '#3A4277', fontSize: 15, fontFamily: Font.FONT_FAMILY_BOLD}}>{assign ? 'Assign Request' : 'Leave Request'}</Text>}
                    </View>

            </View>

            <View style={{height: 60,justifyContent: 'center', padding:10, paddingHorizontal: 20}}>
                <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>{message}<Text style={{color: '#3A4277', fontSize: 14, fontFamily: Font.FONT_FAMILY_BOLD}}> {from} {period ? `for ${period}` : null} {status ? `as ${status}` : null }</Text>.</Text>
            </View>
           { !old ? <View style={{height: 50,flexDirection: 'row', justifyContent: 'center'}}>
               <TouchableOpacity onPress={onPressReject} style={{height: 30, width: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginRight: 20}}>
                    <Text style={{color: '#3A4277', fontSize: 12, fontFamily: Font.FONT_FAMILY_BOLD}}>Reject</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={onPressAccept} style={{height: 30, width: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <Text style={{color: '#3A4277', fontSize: 12, fontFamily: Font.FONT_FAMILY_BOLD}}>Accept</Text>
               </TouchableOpacity>
            </View> : <View></View>}
        

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