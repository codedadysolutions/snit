import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, ToastAndroid, AsyncStorage, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import Font from '../font'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import HistoryComp from '../Comp/HistoryComp'
import axios from 'axios'
import baseurl from '../data'
import Snackbar from 'react-native-snackbar';
import { withNavigationFocus } from 'react-navigation';
import firebase, { Notification, NotificationOpen } from 'react-native-firebase'

// const baseurl = baseurl()

const LeaveBox = ({
    date,leaveStat, cancelPress
})=>(
    <View style={{height: 200, backgroundColor: 'white'}}>
    <View style={{height: 20, justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, flexDirection: 'row'}}>
        <Text style={{color: '#AFAFAF', fontSize: 12, fontFamily: Font.FONT_FAMILY_SEMI}}>Your leave application for  <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_BOLD}}> {date}</Text></Text>
        <Text onPress={cancelPress} style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_BOLD}}>Cancel</Text>
    </View>

    <View style={{flex:1, flexDirection: 'row', marginTop:10, paddingHorizontal: 10}}>
        <View style={{flex:1, backgroundColor: 'white'}}>
            <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    {leaveStat+1==1 ? <ActivityIndicator color='green' size='small' /> : <Icon name={leaveStat == 1||leaveStat > 1 ? 'check-circle' : 'refresh'} size={25} color={leaveStat+1==1 ? 'green' : leaveStat == 1||leaveStat > 1 ? 'blue' : '#7F7F84'} />}
                </View>
            </View>
            <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                <View style={{height: 10, backgroundColor: leaveStat+1==1 ? 'green' : leaveStat == 1||leaveStat > 1 ? 'blue' : '#7F7F84'}}></View>
            </View>
            <View style={{height: 80, borderWidth:0}}>
                <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                    <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                    </View>
                    <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: leaveStat+1==1 ? 'green' : leaveStat == 1||leaveStat > 1 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                </View>
                <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Me</Text>
                </View>
            </View>
            
        </View>

        <View style={{flex:1, backgroundColor: 'white'}}>
            <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    {leaveStat+1==2 ? <ActivityIndicator color='green' size='small' /> : <Icon name={leaveStat == 2||leaveStat > 2 ? 'check-circle' : 'refresh'} size={25} color={leaveStat+1==2 ? 'green' : leaveStat == 2||leaveStat > 2 ? 'blue' : '#7F7F84'} />}
                </View>
            </View>
            <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                <View style={{height: 10, backgroundColor: leaveStat+1==2 ? 'green' : leaveStat == 2||leaveStat > 2 ? 'blue' : '#7F7F84'}}></View>
            </View>
            <View style={{height: 80, borderWidth:0}}>
                <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                    <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                    </View>
                    <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: leaveStat+1==2 ? 'green' : leaveStat == 2||leaveStat > 2 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                </View>
                <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Faqulity</Text>
                </View>
            </View>
            
        </View>

        <View style={{flex:1, backgroundColor: 'white'}}>
            <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    {leaveStat+1==3 ? <ActivityIndicator color='green' size='small' /> : <Icon name={leaveStat == 3||leaveStat > 3 ? 'check-circle' : 'refresh'} size={25} color={leaveStat+1==3 ? 'green' : leaveStat == 3||leaveStat > 3 ? 'blue' : '#7F7F84'} />}
                </View>
            </View>
            <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                <View style={{height: 10, backgroundColor: leaveStat+1==3 ? 'green' : leaveStat == 3||leaveStat > 3 ? 'blue' : '#7F7F84'}}></View>
            </View>
            <View style={{height: 80, borderWidth:0}}>
                <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                    <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                    </View>
                    <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: leaveStat+1==3 ? 'green' : leaveStat == 3||leaveStat > 3 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                </View>
                <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>HOD</Text>
                </View>
            </View>
            
        </View>

        <View style={{flex:1, backgroundColor: 'white'}}>
            <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    {leaveStat+1==4 ? <ActivityIndicator color='green' size='small' /> : <Icon name={leaveStat == 4||leaveStat > 4 ? 'check-circle' : 'refresh'} size={25} color={leaveStat+1==4 ? 'green' : leaveStat == 4||leaveStat > 4 ? 'blue' : '#7F7F84'} />}
                </View>
            </View>
            <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                <View style={{height: 10, backgroundColor: leaveStat+1==4 ? 'green' : leaveStat == 4||leaveStat > 4 ? 'blue' : '#7F7F84'}}></View>
            </View>
            <View style={{height: 80, borderWidth:0}}>
                <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                    <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                    </View>
                    <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: leaveStat+1==4 ? 'green' : leaveStat == 4||leaveStat > 4 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                </View>
                <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Principal</Text>
                </View>
            </View>
            
        </View>

        <View style={{flex:1, backgroundColor: 'white'}}>
            <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    {leaveStat+1==5 ? <ActivityIndicator color='green' size='small' /> : <Icon name={leaveStat == 5||leaveStat > 5 ? 'check-circle' : 'refresh'} size={25} color={leaveStat+1==5 ? 'green' : leaveStat == 5||leaveStat > 5 ? 'blue' : '#7F7F84'} />}
                </View>
            </View>
            <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                <View style={{height: 10, backgroundColor: leaveStat+1==5 ? 'green' : leaveStat == 5||leaveStat > 5 ? 'blue' : '#7F7F84'}}></View>
            </View>
            <View style={{height: 80, borderWidth:0}}>
                <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                    <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                    </View>
                    <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: leaveStat+1==5 ? 'green' : leaveStat == 5||leaveStat > 5 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                </View>
                <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Manager</Text>
                </View>
            </View>  
        </View>
    </View>
</View>
);
  

const{width,height}=Dimensions.get('window')

export default class Home extends Component {

    state={
        leaveStat: 3,
        token:'', 
        data:[],
        leaveData:[],
        nData:[],
        leaveHistory:[],
        cData:[],
        userLevel:'',
        messageConter:'',
        notificationCounter:''
    }


    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("fcm",fcmToken)
        this.tokenUpdate(fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.warn(fcmToken)
            if (fcmToken) {
                this.tokenUpdate(fcmToken)
                await AsyncStorage.setItem('fcmToken', fcmToken);
                console.warn("TOKEN UPDATED", fcmToken)
            }
        }
    }

    tokenUpdate=(fcmToken)=>{

        const formData = new FormData()
        console.warn("TOKKEEENNNNNN", fcmToken)
        formData.append('token', fcmToken)

        axios.post(baseurl+`/snit/update-token/`, formData,{
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Token '+ this.state.token
            }
        })
        .then(response => {
            console.warn("TOKEN SEND", response.data)
        })
        .catch(error => {
            Alert.alert(
                'Error',
                'Something went wrong',
                [
                  {text: 'OK', onPress: () => console.warn("WRONG")},
                ],
                {cancelable: false},
              );
        });
    }

 
    onSuddenPressCard=()=>{
        ToastAndroid.show('Swipe Left or Right on Card !', ToastAndroid.SHORT);
    }

    componentWillMount(){
        // this.getToken() //fcm token update
        this.setState({data: this.props.navigation.state.params.apiData, 
            leaveData: this.props.navigation.state.params.leaveData, 
            nData: this.props.navigation.state.params.nData, 
            token: this.props.navigation.state.params.token, userLevel: this.props.navigation.state.params.apiData[0].level }, ()=> {
                console.log(this.props.navigation.state.params)
                this.refreshLeaveData()
                this.getLeaveHistoryData()
                this.getToken()
        })
    }

    onApplyleavePress=()=>{
        if(this.state.userLevel == '0'){
            this.props.navigation.navigate('LeaveRequestSub', {refreshLeaveData: this.refreshLeaveData})
        }else{
            this.props.navigation.navigate('LeaveRequest', {refreshLeaveData: this.refreshLeaveData}) 
        }
    }


    getLeaveHistoryData=()=>{
        axios.get(baseurl+`/leave/manage-leave/?day=&month=${new Date().getMonth()+1}&year=${new Date().getFullYear()}`,{
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Token '+ this.state.token
            }
        })
        .then(response => {
            console.log("LEAVE HISTO",response.data.results)
            this.setState({leaveHistory: response.data.results})
        })
        .catch(error => {
            console.warn(error)
        });
    }

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
                this.readAdminMessages(response.data.results)
            })
        })
        .catch(error => {
            console.warn(error)
        });
    }

    componentDidMount(){
        this.props.navigation.addListener(
            'willFocus',
            payload => {
            //   console.warn('willFocus', payload);
            this.refreshLeaveData()
            this.getLeaveHistoryData()
            this.getAdminMessages()
            // this.createNotificationListeners()
            // this.readNotification()
            // this.onNotificationDisplayedListener()
            }
          );
    }


    refreshLeaveData=()=>{
        axios.get(baseurl+'/snit/dash-board/',{
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Token '+ this.state.token
            }
    })
        .then(response => {
            console.log(response.data.results)
            this.setState({leaveData: response.data.results[0].leave})
        })
        .catch(error => {
            console.warn(error)
        });
    }

    leaveStatfn=(status)=>{
        switch(status){
            case 'pending': {
                return(1)
            }
            case 'level2': {
                return(2)
            }
            case 'level3': {
                return(3)
            }
            case 'level4': {
                return(4)
            }
            case 'approved': {
                return(5)
            }
        }
    }

    onPressLeaveCancel=(item)=>{
        Alert.alert(
            'Cancel Leave',
            `Are you sure want cancel the leave on ${item.leave_date}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                  const formData = new FormData()

                  formData.append('leaveid', item.id );

                    axios.post(baseurl+'/leave/manage-leave/', formData ,{
                            headers: {
                                'Content-type': 'multipart/form-data',
                                'Authorization': 'Token '+ this.state.token
                            }
                    })
                    .then(response => {
                        console.log(response.data)
                        if(response.data.Status==true){
                            this.refreshLeaveData();
                            Snackbar.show({
                                title: response.data.Message,
                                duration: Snackbar.LENGTH_SHORT,
                                color: 'white'
                            });
                        }
                    })
                    .catch(error => {
                         console.warn(error.response)
                    });
              }},
            ],
            {cancelable: false},
          );
    }

   async logoutFn(){
        try {
            await AsyncStorage.removeItem('@token');
            this.props.navigation.navigate('Login')
        }
        catch(exception) {
            console.warn(exception)
        }
    }

    alertLogout=()=>{
        Alert.alert(
            'Duration',
            'Please select a leave duration',
            [
              {text: 'Logout', onPress: () => this.logoutFn()},
              {text: 'Continue', onPress: ()=> console.log('Canceled'), style: 'cancel'},
            ],
            {cancelable: false},
          );
    }

    leaveFlatlistRender=(item)=>{
        if(item.status=='approved'){
            return null
        }else if(item.status == 'rejected'){
            Alert.alert(
                'Leave Rejected',
                'Your Leave application has been rejected by one of the faquality or higher authority',
                [
                  {text: 'OK', onPress: ()=> {
                    const formData = new FormData()

                    formData.append('leaveid', item.id );
  
                      axios.post(baseurl+'/leave/manage-leave/', formData ,{
                              headers: {
                                  'Content-type': 'multipart/form-data',
                                  'Authorization': 'Token '+ this.state.token
                              }
                      })
                      .then(response => {
                          console.log(response.data)
                          if(response.data.Status==true){
                              this.refreshLeaveData();
                              Snackbar.show({
                                  title: "Leave Rejected.",
                                  duration: Snackbar.LENGTH_SHORT,
                                  color: 'white'
                              });
                          }
                      })
                      .catch(error => {
                           console.warn(error.response)
                      });
                  }},
                ],
                {cancelable: false},
              ); 
              return null
        }else{
            return(
                <View style={{height: 200, width:width}}>
                    <LeaveBox date={item.leave_date} leaveStat={this.leaveStatfn(item.status)} cancelPress={()=> this.onPressLeaveCancel(item)} />
                </View>
            )
        }
    }

    readAdminMessages=(data)=>{
        console.warn("WORKING DATA READ")
        var counter = data.length
        for(i=0;i<data.length;i++){
            if(data[i].read == 1){
                counter = counter-1
                this.setState({messageConter: counter.toString()})
                console.warn("COUNTER", counter)
            }
        }
    }

    async findDataRead(){
        var colectedIds = []
        for(i=0;i<this.state.cData.length;i++){
            if(this.state.cData[i].read == 0){
                colectedIds.push(this.state.cData[i].id)
            }
        }
        this.makeReadData(colectedIds.join())
    }
    

  render() {
      console.warn(this.state.leaveHistory)
    return (
      <View style={styles.mainContainer}>

        <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
            <View style={{flex:1,flexDirection: 'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal:20}}>
                <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Home</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Notification', {nData: this.state.nData})} style={{width: 50, justifyContent:"center", alignItems: 'center', position: "relative"}}>
                    {this.state.nData.length ? <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor:'red', position: 'absolute', top:15, right: 5, justifyContent: 'center', alignItems: "center"}}>
                        {/* <Text style={{color: 'white', fontSize: 9, fontFamily: Font.FONT_FAMILY_BOLD}}>{this.state.nData.length}</Text> */}
                    </View> : null}
                    <Icon name='bell-ring' size={20} color='#3A4277'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('History', {token: this.state.token})}  style={{width: 50, justifyContent:"center", alignItems: 'center'}}>
                    <Icon name='account' size={22} color='#3A4277'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chat',{cData: this.state.cData})}  style={{width: 50, justifyContent:"center", alignItems: 'center', position: 'relative'}}>
                {this.state.messageConter !== '0' ? <View style={{height: 15, width: 15, borderRadius: 10, backgroundColor:'red', position: 'absolute', top:15, right: 5, justifyContent: 'center', alignItems: "center"}}>
                        <Text style={{color: 'white', fontSize: 7, fontFamily: Font.FONT_FAMILY_BOLD}}>{this.state.messageConter}</Text>
                    </View> : null}
                    <Icon name='android-messages' size={20} color='#3A4277'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.alertLogout()}  style={{width: 50, justifyContent:"center", alignItems: 'center'}}>
                    <Icon name='logout' size={22} color='#3A4277'/>
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={{flex:1}}>

        <View style={{height: 120, padding: 20, marginTop: 20}}>
            <TouchableOpacity onPress={()=>this.onApplyleavePress()} style={{height: 100, borderWidth: 3, borderRadius: 10, borderColor:'#3A4277', elevation: 5, backgroundColor: 'white', justifyContent:'center',alignItems:'center'}}>
                <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Apply for Leave</Text>
            </TouchableOpacity>
        </View>
        
        <View style={{flex:1, marginTop: 20}}>

            <View style={{height: 40, flexDirection: 'row'}}>
                <View style={{width: 150, paddingHorizontal: 20, justifyContent: 'center'}}>
                    <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Leave Status</Text>
                </View>
                <View style={{flex:1, paddingHorizontal: 10, paddingRight: 20}}>

                    <View style={{flex:1, borderBottomWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>
                    <View style={{flex:1,  borderTopWidth: 1, borderColor:'#D9D9D9'}}>
                    </View>

                </View>
            </View>

            <View style={{height: 200, backgroundColor: 'white'}}>
                
                {this.state.leaveData.length ? <FlatList
                    data={this.state.leaveData}
                    pagingEnabled={true}
                    horizontal={true}
                    renderItem={({ item }) => (
                        // item.status =! 'approved' && 
                        this.leaveFlatlistRender(item)
                    // <View style={{height: 200, width:width}}>
                    //     <LeaveBox date={item.leave_date} leaveStat={this.leaveStatfn(item.status)} cancelPress={()=> this.onPressLeaveCancel(item)} />
                    // </View>

                    )}
                    // keyExtractor={item => item.id}
                />: <View style={{height: 200, width: width, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_BOLD}}>No Pending Leaves</Text></View>}

            </View>

            <View>
                <View style={{height: 40, flexDirection: 'row'}}>
                    <View style={{width: 160, paddingHorizontal: 20, justifyContent: 'center'}}>
                        <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_BOLD}}>Leave History</Text>
                    </View>
                    <View style={{flex:1, paddingHorizontal: 10, paddingRight: 20}}>

                        <View style={{flex:1, borderBottomWidth: 1, borderColor:'#D9D9D9'}}>
                        </View>
                        <View style={{flex:1,  borderTopWidth: 1, borderColor:'#D9D9D9'}}>
                        </View>

                    </View>
                 </View>
             </View>

             <View onPress={()=>this.onSuddenPressCard()} style={{height: 150, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
{this.state.leaveHistory.length ? <CardStack
                loop
                disableTopSwipe
                disableBottomSwipe
                style={{height: 150, width: width, backgroundColor: 'white', justifyContent: 'center', alignItems:'center'}} ref={swiper => { this.swiper = swiper }}>

                 {this.state.leaveHistory.map((item)=>{
                     return(
                        <Card style={{height: 150, width: width-20}}>
                            <HistoryComp date={item.leave_date} leaveKind={item.leaveType} reason={item.reason} onPressCard={()=>this.onSuddenPressCard()} />
                        </Card>
                     )
                 })}
                
            </CardStack> : <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_BOLD}}>No Leave History</Text></View>}
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