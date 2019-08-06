import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'

export default class Subs extends Component {


  render() {
    return (
      <View style={styles.mainContainer}>
          <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
              <View style={{flex:1,flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{width: 60, justifyContent:"center", alignItems: 'center'}}>
                      <Icon name='arrow-back' size={20} color='#3A4277'/>
                  </TouchableOpacity>
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal:0}}>
                      <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Assign People</Text>
                  </View>
              </View>
          </View>
        
        <View style={{flex:1, marginTop: 20}}>
            <View>
                
            </View>
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