import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import Modal2 from "react-native-modal";
import moment from 'moment';



export default class LeaveRequest extends Component {

    state={
        status: 1,
        isDateTimePickerVisible1: false,
        isDateTimePickerVisible2: false,
        startDate:'Pick your leave date',
        leavefnState:null,
        isModalVisible: false,
        isModalVisible1: false,
        duration: 'Duration',
        leaveType:'Type of Leave',
        p1:'Period 1',
        p2:'Period 2',
        p3:'Period 3',
        p4:'Period 4',
        p5:'Period 5',
        p6:'Period 6',

        
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };

      toggleModal1 = () => {
        this.setState({ isModalVisible1: !this.state.isModalVisible1 });
      };


    showDateTimePicker1 = () => {
        this.setState({ isDateTimePickerVisible1: true });
      };
     
      hideDateTimePicker1 = () => {
        this.setState({ isDateTimePickerVisible1: false });
      };
     
      handleDatePicked1 = date => {
        console.log("A date has been picked: ", Object.date);
        this.setState({startDate: date})
        this.hideDateTimePicker1();
      };


      onSubmitFirst=()=>{
          this.setState({status: 2})
      }

      onSubmitSecond=()=>{
        Alert.alert(
            'Leave Form Submitted',
            'Your leave application is on proccesing stage, you will be notified when its ready.',
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
            ],
            {cancelable: false},
          );
    }


    renderLeaveSec=()=>{
        if(this.state.status===1){
            return(
                <View style={{flex:1, marginTop: 20}}>
                <View style={{height: 500, backgroundColor: '#F6F4F4', margin: 10, padding: 10, borderRadius: 10}}>

                <TouchableOpacity onPress={()=> this.toggleModal()} style={{height: 50, justifyContent: 'center', backgroundColor: 'white', margin: 5, marginVertical: 10, flexDirection: 'row'}}>
                    <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 20}}>
                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>{this.state.duration}</Text>
                    </View>
                    <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon2 name='account-clock' size={25} color='#3A3A3A' />
                    </View> 
                </TouchableOpacity>
    
               <TouchableOpacity onPress={()=>this.showDateTimePicker1()} style={{height: 50, justifyContent: 'center', backgroundColor: 'white', margin: 5, marginVertical: 10, flexDirection: 'row'}}>
                   <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 20}}>
                         <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>{this.state.startDate.toString()}</Text>
                    </View>
                     <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
                         <Icon2 name='calendar' size={25} color='#3A3A3A' />
                    </View>
                </TouchableOpacity>

    
                  <TouchableOpacity onPress={()=> this.toggleModal1()} style={{height: 50, justifyContent: 'center', backgroundColor: 'white', margin: 5, marginVertical: 10, flexDirection: 'row'}}>
                      <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 20}}>
                          <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>{this.state.leaveType}</Text>
                      </View>
                      <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
                          <Icon2 name='arrow-down-drop-circle' size={25} color='#3A3A3A' />
                      </View>
                  </TouchableOpacity>
    
                  <View style={{height: 100, paddingHorizontal: 20,padding:10, backgroundColor: 'white', marginVertical: 10, margin:5}}>
                       <TextInput
                       style={{fontSize: 13, color: '#3A3A3A', fontFamily: Font.FONT_FAMILY_REG}}
                       placeholder={'Reason for Leave'}
                       placeholderTextColor={'#3A3A3A'}
                       />
                  </View>
    
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>this.onSubmitFirst()} style={{height: 40, width: 120, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#3A4277', borderRadius: 20 }}>
                        <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_BOLD}}>Next</Text>
                    </TouchableOpacity>
                  </View>
    
                </View>
            </View>
            )
        }

        else if(this.state.status===2) {
            return(
                <View style={{flex:1}}>

                    <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_SEMI}}>Assign Substitutes</Text>
                    </View>

                 <View style={{height: 550, backgroundColor: '#F6F4F4', margin: 10, padding: 10, borderRadius: 10}}>


                    <View style={{height: 40, flexDirection: 'row'}}>
                        <View style={{width: 150, paddingHorizontal: 20, justifyContent: 'center'}}>
                            <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI}}>25 Aug 2019</Text>
                        </View>

                        <View style={{flex:1, paddingHorizontal: 10, paddingRight: 20}}>

                            <View style={{flex:1, borderBottomWidth: 1, borderColor:'#D9D9D9'}}>
                            </View>
                            <View style={{flex:1,  borderTopWidth: 1, borderColor:'#D9D9D9'}}>
                            </View>

                        </View>
                    </View>
                
                  <View style={{height: 60, justifyContent: 'center', marginTop: 10}}>
                        <View style={{height: 40, flexDirection: 'row'}}>
                                <TouchableOpacity style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Period 1</Text>
                                    </View>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                     <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Period 2</Text>
                                     </View>
                                     <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                        </View>
                  </View>

                  <View style={{height: 60, justifyContent: 'center', marginTop: 10}}>
                        <View style={{height: 40, flexDirection: 'row'}}>
                                <TouchableOpacity style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Period 3</Text>
                                    </View>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                     <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Period 4</Text>
                                     </View>
                                     <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                        </View>
                  </View>

                  <View style={{height: 60, justifyContent: 'center', marginTop: 10}}>
                        <View style={{height: 40, flexDirection: 'row'}}>
                                <TouchableOpacity style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Period 5</Text>
                                    </View>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                     <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Period 6</Text>
                                     </View>
                                     <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                        </View>
                  </View>

                  <View style={{height: 30, justifyContent:'center', paddingHorizontal: 10}}>
                        <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Extra Duty</Text>
                  </View>

                  <View style={{height: 100, paddingHorizontal: 20,padding:10, backgroundColor: 'white', marginVertical: 10, margin:5}}>
                       <TextInput
                       style={{fontSize: 13, color: '#3A3A3A', fontFamily: Font.FONT_FAMILY_REG}}
                       placeholder={'Extra Duty (if there is any extra duty)'}
                       placeholderTextColor={'#3A3A3A'}
                       />
                  </View>

                  <TouchableOpacity style={{height: 50, justifyContent: 'center', backgroundColor: 'white', margin: 5, marginVertical: 10, flexDirection: 'row'}}>
                      <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 20}}>
                          <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>AssignSub for Extra Duty (Optional)</Text>
                      </View>
                      <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
                          <Icon2 name='arrow-down-drop-circle' size={25} color='#3A3A3A' />
                      </View>
                  </TouchableOpacity>

                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>this.onSubmitSecond()} style={{height: 40, width: 120, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#3A4277', borderRadius: 20 }}>
                        <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_BOLD}}>Submit</Text>
                    </TouchableOpacity>
                  </View>

             </View>


                </View>
            )
        }
    }


  render() {

    return (
      <View style={styles.mainContainer}>
          <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
              <View style={{flex:1,flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{width: 60, justifyContent:"center", alignItems: 'center'}}>
                      <Icon name='arrow-back' size={20} color='#3A4277'/>
                  </TouchableOpacity>
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal:0}}>
                      <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Leave Request</Text>
                  </View>
              </View>
          </View>

          <ScrollView style={{flex:1}} ref={(ref)=>this.ScrollView=ref}>
            {this.renderLeaveSec()}
        </ScrollView>


        <Modal 
        isVisible={this.state.isModalVisible}
        onBackButtonPress={()=>this.toggleModal()}
        onBackdropPress={()=>this.toggleModal()}
        style={{height: 200, justifyContent: 'center', alignItems: 'center'}}
        >
          <View style={{ height: 200, width: 300, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            
            <View style={{height: 60, justifyContent: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#3A4277'}}>
                <Text style={{color: '#3A3A3A', fontSize: 15, fontFamily: Font.FONT_FAMILY_BOLD}}>Select Duration</Text>
            </View>
            <View style={{flex:1, backgroundColor: '#F6F4F4', padding: 20}}>

                <TouchableOpacity onPress={()=>this.setState({leavefnState:1, duration: 'Half Day Leave'}, ()=> this.toggleModal())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Half Day Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({leavefnState:2, duration: 'Full Day Leave'}, ()=> this.toggleModal())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Full Day Leave</Text>
                </TouchableOpacity>

            </View>

          </View>
        </Modal>


        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible1}
          onConfirm={this.handleDatePicked1}
          onCancel={this.hideDateTimePicker1}
        />

    <Modal 
        isVisible={this.state.isModalVisible1}
        onBackButtonPress={()=>this.toggleModal1()}
        onBackdropPress={()=>this.toggleModal1()}
        style={{height: 250, justifyContent: 'center', alignItems: 'center'}}
        >
          <View style={{ height: 250, width: 300, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            
            <View style={{height: 60, justifyContent: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#3A4277'}}>
                <Text style={{color: '#3A3A3A', fontSize: 15, fontFamily: Font.FONT_FAMILY_BOLD}}>Select Duration</Text>
            </View>
            <View style={{flex:1, backgroundColor: '#F6F4F4', padding: 20}}>


            <TouchableOpacity onPress={()=>this.setState({leaveType:'Casual Leave'}, ()=> this.toggleModal1())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Casual Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({leaveType:'Sick Leave'}, ()=> this.toggleModal1())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Sick Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({leaveType:'Other'}, ()=> this.toggleModal1())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Other</Text>
                </TouchableOpacity>

            </View>

          </View>
        </Modal>


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