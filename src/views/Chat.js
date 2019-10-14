import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'
import MessageComp from '../Comp/messageComp'
import axios from 'axios'
import baseurl from '../data'

const{width,height}=Dimensions.get('window')

export default class Chat extends Component {

    state={
        cData:[], 
        token:''
    }
    

    componentDidMount(){
        this._retrieveData()
    }


    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@token');
            if (value !== null) {
            // We have data!!
            this.setState({token: value }, ()=>{
                this.getAdminMessages()
            })
            console.log("GOT IT ",value);
            }
            else{
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            console.warn("ERROR")
        }
    };

    getAdminMessages=()=>{
        axios.get(baseurl+'/snit/chats/',{
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Token '+ this.state.token
            }
        })
        .then(response => {
            console.log("ADMIN MESAGE",response.data.results)
            this.setState({cData: response.data.results}, ()=>{
                this.findDataRead()
            })
        })
        .catch(error => {
            console.warn(error)
        });
    }

   async findDataRead(){
        var colectedIds = []
        for(i=0;i<this.state.cData.length;i++){
            if(this.state.cData[i].read == 0){
                colectedIds.push(this.state.cData[i].id)
                // if(colectedIds.length){
                //     colectedIds.join(","+this.state.cData[i].id)
                // }else{
                //     colectedIds.join(this.state.cData[i].id) 
                // }
            }
            // console.warn('OLD ID', colectedIds.join())
        }
        this.makeReadData(colectedIds.join())
    }

    makeReadData=(ids)=>{
        var formData = new FormData()
        formData.append('messageids', ids )
        axios.post(baseurl+'/snit/set-as-read/',formData,{
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Token '+ this.state.token
            }
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.warn(error.response.data)
        });
    }


    renderMessages=(item)=>{
        return(
            <MessageComp messageData={item.message} />
        )
    }

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

            <View style={{justifyContent: 'center', alignItems:'center'}}>
                {/* <MessageComp messageData={'College will be off due to ramzan for 3 Days, SNIT Management wishes you happy Eid Mubarak'} />
                <MessageComp messageData={'College will be off due to ramzan for 3 Days, SNIT Management wishes you happy Eid Mubarak'} /> */}
                {this.state.cData.length ? <FlatList
                        data={this.state.cData}
                        refreshing={true}
                        renderItem={({ item }) => 
                        this.renderMessages(item)
                    }
                        keyExtractor={item => item.id.toString()}
                    /> :  <ActivityIndicator size='large' color='#3A4277' />}
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
