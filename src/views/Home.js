import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import Font from '../font'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import HistoryComp from '../Comp/HistoryComp'

const{width,height}=Dimensions.get('window')

export default class Home extends Component {

    state={
        leaveStat: 3,
    }

    onSuddenPressCard=()=>{
        ToastAndroid.show('Swipe Left or Right on Card !', ToastAndroid.SHORT);
    }

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
            <View style={{flex:1,flexDirection: 'row'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal:20}}>
                <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Home</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Notification')} style={{width: 50, justifyContent:"center", alignItems: 'center'}}>
                    <Icon name='bell-ring' size={20} color='#3A4277'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('History')}  style={{width: 50, justifyContent:"center", alignItems: 'center'}}>
                    <Icon name='account' size={22} color='#3A4277'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chat')}  style={{width: 50, justifyContent:"center", alignItems: 'center'}}>
                    <Icon name='android-messages' size={20} color='#3A4277'/>
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={{flex:1}}>

        <View style={{height: 120, padding: 20, marginTop: 20}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('LeaveRequest')} style={{height: 100, borderWidth: 3, borderRadius: 10, borderColor:'#3A4277', elevation: 5, backgroundColor: 'white', justifyContent:'center',alignItems:'center'}}>
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

            <View style={{height: 20, justifyContent: 'flex-end', alignItems: 'flex-start', paddingLeft: 20}}>
                <Text style={{color: '#AFAFAF', fontSize: 12, fontFamily: Font.FONT_FAMILY_SEMI}}>Your leave application for 25 th july 2019</Text>
            </View>

            <View style={{marginTop:10,height: 180, backgroundColor: 'white', paddingHorizontal: 10}}>

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.leaveStat+1==1 ? <ActivityIndicator color='green' size='small' /> : <Icon name={this.state.leaveStat == 1||this.state.leaveStat > 1 ? 'check-circle' : 'refresh'} size={25} color={this.state.leaveStat+1==1 ? 'green' : this.state.leaveStat == 1||this.state.leaveStat > 1 ? 'blue' : '#7F7F84'} />}
                            </View>
                        </View>
                        <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                            <View style={{height: 10, backgroundColor: this.state.leaveStat+1==1 ? 'green' : this.state.leaveStat == 1||this.state.leaveStat > 1 ? 'blue' : '#7F7F84'}}></View>
                        </View>
                        <View style={{height: 80, borderWidth:0}}>
                            <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                                <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                                </View>
                                <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: this.state.leaveStat+1==1 ? 'green' : this.state.leaveStat == 1||this.state.leaveStat > 1 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                            </View>
                            <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Me</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.leaveStat+1==2 ? <ActivityIndicator color='green' size='small' /> : <Icon name={this.state.leaveStat == 2||this.state.leaveStat > 2 ? 'check-circle' : 'refresh'} size={25} color={this.state.leaveStat+1==2 ? 'green' : this.state.leaveStat == 2||this.state.leaveStat > 2 ? 'blue' : '#7F7F84'} />}
                            </View>
                        </View>
                        <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                            <View style={{height: 10, backgroundColor: this.state.leaveStat+1==2 ? 'green' : this.state.leaveStat == 2||this.state.leaveStat > 2 ? 'blue' : '#7F7F84'}}></View>
                        </View>
                        <View style={{height: 80, borderWidth:0}}>
                            <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                                <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                                </View>
                                <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: this.state.leaveStat+1==2 ? 'green' : this.state.leaveStat == 2||this.state.leaveStat > 2 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                            </View>
                            <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Faqulity</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.leaveStat+1==3 ? <ActivityIndicator color='green' size='small' /> : <Icon name={this.state.leaveStat == 3||this.state.leaveStat > 3 ? 'check-circle' : 'refresh'} size={25} color={this.state.leaveStat+1==3 ? 'green' : this.state.leaveStat == 3||this.state.leaveStat > 3 ? 'blue' : '#7F7F84'} />}
                            </View>
                        </View>
                        <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                            <View style={{height: 10, backgroundColor: this.state.leaveStat+1==3 ? 'green' : this.state.leaveStat == 3||this.state.leaveStat > 3 ? 'blue' : '#7F7F84'}}></View>
                        </View>
                        <View style={{height: 80, borderWidth:0}}>
                            <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                                <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                                </View>
                                <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: this.state.leaveStat+1==3 ? 'green' : this.state.leaveStat == 3||this.state.leaveStat > 3 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                            </View>
                            <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>HOD</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.leaveStat+1==4 ? <ActivityIndicator color='green' size='small' /> : <Icon name={this.state.leaveStat == 4||this.state.leaveStat > 4 ? 'check-circle' : 'refresh'} size={25} color={this.state.leaveStat+1==4 ? 'green' : this.state.leaveStat == 4||this.state.leaveStat > 4 ? 'blue' : '#7F7F84'} />}
                            </View>
                        </View>
                        <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                            <View style={{height: 10, backgroundColor: this.state.leaveStat+1==4 ? 'green' : this.state.leaveStat == 4||this.state.leaveStat > 4 ? 'blue' : '#7F7F84'}}></View>
                        </View>
                        <View style={{height: 80, borderWidth:0}}>
                            <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                                <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                                </View>
                                <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: this.state.leaveStat+1==4 ? 'green' : this.state.leaveStat == 4||this.state.leaveStat > 4 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                            </View>
                            <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Principal</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <View style={{height: 70, borderWidth:0, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 25, elevation: 5, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.leaveStat+1==5 ? <ActivityIndicator color='green' size='small' /> : <Icon name={this.state.leaveStat == 5||this.state.leaveStat > 5 ? 'check-circle' : 'refresh'} size={25} color={this.state.leaveStat+1==5 ? 'green' : this.state.leaveStat == 5||this.state.leaveStat > 5 ? 'blue' : '#7F7F84'} />}
                            </View>
                        </View>
                        <View style={{height: 30, borderWidth:0, paddingHorizontal: 2.5}}>
                            <View style={{height: 10, backgroundColor: this.state.leaveStat+1==5 ? 'green' : this.state.leaveStat == 5||this.state.leaveStat > 5 ? 'blue' : '#7F7F84'}}></View>
                        </View>
                        <View style={{height: 80, borderWidth:0}}>
                            <View style={{height: 20, position: 'relative', justifyContent: 'center'}}>
                                <View style={{height: 5, backgroundColor: '#D9D9D9'}}>
                                </View>
                                <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: this.state.leaveStat+1==5 ? 'green' : this.state.leaveStat == 5||this.state.leaveStat > 5 ? 'blue' : '#7F7F84', position:'absolute', top: 5, left:((width-20)/5)/2-5}}></View>
                            </View>
                            <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Manager</Text>
                            </View>
                        </View>  
                    </View>
                </View>
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

             <View onPress={()=>this.onSuddenPressCard()} style={{height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', marginTop: 10}}>
             <CardStack
                loop
                style={{height: 150, width: width, backgroundColor: 'white', justifyContent: 'center', alignItems:'center'}} ref={swiper => { this.swiper = swiper }}>
                <Card style={{height: 150, width: width-20,}}>
                    <HistoryComp date='25 Jan 2019' leaveKind='Medical Leave' reason='Reason for the leave' onPressCard={()=>this.onSuddenPressCard()} />
                </Card>
                <Card style={{height: 150, width: width-20,}}>
                    <HistoryComp date='25 Jan 2019' leaveKind='Medical Leave' reason='Reason for the leave' onPressCard={()=>this.onSuddenPressCard()} />
                </Card>
                <Card style={{height: 150, width: width-20,}}>
                    <HistoryComp date='25 Jan 2019' leaveKind='Medical Leave' reason='Reason for the leave' onPressCard={()=>this.onSuddenPressCard()} />
                </Card>
                
            </CardStack>
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