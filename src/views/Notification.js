import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'
import NotificationComp from '../Comp/NotificationComp'
import axios from 'axios'
import baseurl from '../data'

const{width,height}=Dimensions.get('window')

export default class Notification extends Component {

    state={
        nData:[],
        token:'',
        loader:false
    }

_retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
        // We have data!!
        this.setState({token: value }, ()=>{
            console.warn(this.state.token)
            this.getnData()
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

componentWillMount(){
    this._retrieveData()
    this.setState({nData: this.props.navigation.state.params ? this.props.navigation.state.params.nData : []})
}


getnData=()=>{
    this.setState({loader: true})

    axios.get(baseurl+`/leave/notifications/`,{
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Token '+ this.state.token
        }
    })
    .then(response => {
        console.log("NOTIFICATION DATA",response.data.results)
        this.setState({nData: response.data.results},()=>{
            this.setState({loader: false})
        })
    })
    .catch(error => {
        console.warn(error)
    });
}

renderNotification=(item)=>{
    // const {nData}=this.state
    if(item.notificationType == 'assign'){
        if(item.status == "assign"){
            return (
                <NotificationComp assign={true} old={item.read} message={"You recived an assign request from "} from={item.leaveusername} period={item.period} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
            )
        }else{
            return(
                <NotificationComp assign={true} old={item.read} from={item.leaveusername} message={"You recived an assign request from "} period={item.period} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
            )
        }
    }
    
    else if(item.notificationType == "hod_response" || item.notificationType == "principal_response" || item.notificationType == "manager_response" || item.notification_for == 'normal_notification'){
        if(item.status == 'assign'){
            return (
                <NotificationComp assign={false} normal={true} from={item.post_by[0].username} message={"You recived a response from "} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
            )
        }else if (item.status == 'level2'){
            return (
                <NotificationComp assign={false} normal={true} old={true}  message={"All Substitutes accepted your leave request"} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
            )
        }else if(item.status == 'accept'){
            return(
                <NotificationComp assign={false} normal={true} old={true} from={item.post_by[0].username} message={"You recived a response from "} status={'accepted'} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} /> 
            )
        }else if(item.status == 'reject'){
            return(
                <NotificationComp assign={false} normal={true} old={true} from={item.post_by[0].username} message={"You recived a response from "} status={'rejected'} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} /> 
            )
        }else if(item.status == 'rejected'){
            return(
                <NotificationComp assign={false} normal={true} old={true} from={item.post_by[0].username} message={"You recived a response from "} status={'rejected'} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} /> 
            )
        }
        else if(item.status == 'approved'){
            return(
                <NotificationComp assign={false} normal={true} old={true} message={'Congrats, your leave has been approved'} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} /> 
            )
        }
        else{
            console.warn("BLABLA")
            return (
                <NotificationComp assign={false} old={true} from={item.post_by[0].username} message={"You recived a response from "} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
            )
        }
    }
    
    else if(item.notification_for == "leave_approval"){
        console.warn("THIS leave_approval")
        return(
            <NotificationComp assign={false} old={item.read} from={item.leaveusername}  message={"You recived a leave request from "} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
        )
    }
    // else if(item.notificationType){

    // }

    else{
        return(
            <NotificationComp assign={false} old={true} normal={true} message={"You recived a response from "} period={item.period} from={item.post_by[0].username} status={item.status} onPressReject={()=>this.onPressButtons(item, false)} onPressAccept={()=>this.onPressButtons(item, true)} />
        )
    }
}



onPressButtons=(item, x)=>{
    if(x==true){
        this.buttonPressApi(item.leaveid, 'accept', item.period, item.id, item.notification_for )
    }else{
        this.buttonPressApi(item.leaveid, 'reject', item.period, item.id, item.notification_for )
    }
}

buttonPressApi=(leaveId, val, period, nid, nfor)=>{ 

    // console.warn(`leaveid: ${leaveId}, val: ${val}, period: ${period}, nid: ${nid}, nfor: ${nfor}`)
    console.warn(`leaveid: ${leaveId}, val: ${val}, period: ${period}`)


    const formData =  new FormData()

    // if(nfor == 'leave_approval'){
    //     console.warn(true)
        formData.append("notification_id", nid )
    // }

    formData.append("leaveid", leaveId )
    formData.append("response", val )
    formData.append("period", period )


    axios.post(baseurl+`/leave/leave-approve/`, formData,{
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Token '+ this.state.token
        }
    })
    .then(response => {
        console.log("NOTIFICATION DATA",response.data)
        if(response.data.Status == true){
            Alert.alert(
                'Done',
                'Your response has been completed',
                [
                  {text: 'OK', onPress: () => this.setState({nData:[]}, ()=>this.getnData())},
                ],
                {cancelable: false},
              );
        }
    })
    .catch(error => {
        console.warn(error.response.data)
    });

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
                    <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Notification</Text>
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
                    {!this.state.loader ? <FlatList
                        data={this.state.nData}
                        renderItem={({ item }) => 
                        this.renderNotification(item)
                    }
                        keyExtractor={item => item.id}
                    /> :  <ActivityIndicator size='large' color='#3A4277' />}

            </View>

            {/* <View style={{height: 40, flexDirection: 'row'}}>
                <View style={{width: 120, paddingHorizontal: 20, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI}}>Last Week</Text>
                </View>
                <View style={{flex:1, paddingHorizontal: 10, paddingRight: 20}}>

                    <View style={{flex:1, borderBottomWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>
                    <View style={{flex:1,  borderTopWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>

                </View>
            </View>

            <View style={{justifyContent: 'center', alignItems:'center', }}>
                <NotificationComp assign={true} old={true} />
            </View> */}


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
