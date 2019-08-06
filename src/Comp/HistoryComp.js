import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from '../font'
const{width,height}=Dimensions.get('window')

export default class HistoryComp extends Component {

  render() {
      const{date,leaveKind,reason, onPressCard}=this.props
    return (
        <Card style={{height: 150, width: width-20,}}>
        <TouchableOpacity onPress={onPressCard} style={{height: 150, width: width-20, borderRadius: 10, backgroundColor: '#DDD8F5'}}>
        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'white', flexDirection:'row'}}>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{width:40, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='calendar' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{date}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Icon name='medical-bag' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{leaveKind}</Text>
                </View>
            </View>
        </View>

        <View style={{flex:1,justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{reason}</Text>
        </View>
        

    </TouchableOpacity>
    </Card>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex:1,
    }
});