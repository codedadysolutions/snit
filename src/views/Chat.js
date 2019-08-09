import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'
import MessageComp from '../Comp/messageComp'

const{width,height}=Dimensions.get('window')

export default class Chat extends Component {

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
            <View style={{flex:1,flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{width: 60, justifyContent:"center", alignItems: 'center'}}>
                    <Icon2 name='arrow-back' size={20} color='#3A4277'/>
                </TouchableOpacity>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal:0}}>
                    <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Messages</Text>
                </View>
            </View>
        </View>

        <ScrollView>

        <View style={{flex:1, marginTop: 20}}>
            <View style={{height: 40, flexDirection: 'row'}}>
                <View style={{width: 100, paddingHorizontal: 20, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI}}>New</Text>
                </View>
                <View style={{flex:1, paddingHorizontal: 10, paddingRight: 20}}>

                    <View style={{flex:1, borderBottomWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>
                    <View style={{flex:1,  borderTopWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>

                </View>
            </View>

            <View style={{justifyContent: 'center', alignItems:'center', }}>
                <MessageComp messageData={'College will be off due to ramzan for 3 Days, SNIT Management wishes you happy Eid Mubarak'} />
                <MessageComp messageData={'College will be off due to ramzan for 3 Days, SNIT Management wishes you happy Eid Mubarak'} />
            </View>

            <View style={{height: 40, flexDirection: 'row'}}>
                <View style={{width: 100, paddingHorizontal: 20, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI}}>Old</Text>
                </View>
                <View style={{flex:1, paddingHorizontal: 10, paddingRight: 20}}>

                    <View style={{flex:1, borderBottomWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>
                    <View style={{flex:1,  borderTopWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>

                </View>
            </View>

            <View style={{justifyContent: 'center', alignItems:'center', }}>
                <MessageComp messageData={'Hope you are safe, Make sure to use Helpline number in case of any emergency during flood.'} />
            </View>


        </View>
        </ScrollView>
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
