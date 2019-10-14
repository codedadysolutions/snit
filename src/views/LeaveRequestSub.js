import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert, ActivityIndicator, AsyncStorage, FlatList, BackHandler } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker'
import Modal from "react-native-modal";
import Modal2 from "react-native-modal";
import moment from 'moment';
import baseurl from '../data'
import axios from 'axios'
import Snackbar from 'react-native-snackbar';


export default class LeaveRequestSub extends Component {

    state={
        status: 1,
        isDateTimePickerVisible1: false,
        isDateTimePickerVisible2: false,
        startDate:'Pick your leave date',
        leaveDate: null,
        leavefnState:null,
        isModalVisible: false,
        isModalVisible1: false,
        duration: 'Duration',
        leaveType:'Type of Leave',
        leaveTypeOg: null,
        p1:{id:0,name:'Assign a Substitute'},
        // p2:{id:0,name:'Period 2'},
        // p3:{id:0,name:'Period 3'},
        // p4:{id:0,name:'Period 4'},
        // p5:{id:0,name:'Period 5'},
        // p6:{id:0,name:'Period 6'},
        // p7:{id:0,name:'AssignSub for Extra Duty (Optional)'},
        reasonText: 'Some other reason',
        loader:false,
        token: ''  ,
        leaveid: null,
        possibleFaq:[],
        isModalVisible3:false,
        currentPressedPeriod:'',
        selectedPeriodSub:[],
        epname:'',
        loader2: false
    }

    componentDidMount(){
        this._retrieveData()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        this.backHandler.remove()
      }
  
      handleBackPress = () => {
        this.goBackfn(); // works best when the goBack is async
        return true;
      }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@token');
          if (value !== null) {
            // We have data!!
            console.log("Got Token ",value);
            this.setState({token: value})
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };

      toggleModal1 = () => {
        this.setState({ isModalVisible1: !this.state.isModalVisible1 });
      };
      
      toggleModal3 = () => {
        this.setState({ isModalVisible3: !this.state.isModalVisible3 });
      };



    showDateTimePicker1 = () => {
        this.setState({ isDateTimePickerVisible1: true });
      };
     
      hideDateTimePicker1 = () => {
        this.setState({ isDateTimePickerVisible1: false });
      };

     
      handleDatePicked1 = date => {
        // console.warn("A date has been picked: ", new Date (date));

          console.log("A date has been picked: ", date.toISOString().slice(0, 10));
        
          let result = date.toISOString().slice(0, 10)

        this.setState({startDate: result, leaveDate: result})
        this.hideDateTimePicker1();
      };


      onSubmitFirst=()=>{


        if(this.state.leavefnState == null){
            Alert.alert(
                'Duration',
                'Please select a leave duration',
                [
                  {text: 'OK', onPress: () => console.warn('OK pressed')},
                ],
                {cancelable: false},
              );
        }
        else if (this.state.leaveDate == null){
            Alert.alert(
                'Leave Date',
                'Please select a leave date',
                [
                  {text: 'OK', onPress: () => console.warn('OK pressed')},
                ],
                {cancelable: false},
              );
        }
        else if(this.state.leaveTypeOg == null ){
            Alert.alert(
                'Leave Type',
                'Please select a leave type',
                [
                  {text: 'OK', onPress: () => console.warn('OK pressed')},
                ],
                {cancelable: false},
              );
        }
        else if(this.state.reasonText.length<5){
            Alert.alert(
                'Reason',
                'Please provide a reason for the leave',
                [
                  {text: 'OK', onPress: () => console.warn('OK pressed')},
                ],
                {cancelable: false},
              );
        }
        else{
            this.setState({loader: true})
            console.log('GOOD TO GO')
        //   this.setState({status: 2})



        var that = this
        const formData = new FormData()


        formData.append('leave_type',this.state.leaveTypeOg );
        formData.append('purpose',this.state.reasonText );
        formData.append('leave_date', this.state.leaveDate)
        formData.append('duration', this.state.leavefnState)
    
        axios.defaults.withCredentials = true
    
        axios.post(baseurl+"/leave/apply-leave/", formData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'Token '+ this.state.token
                }

        })
        .then(response => { 
            console.log("FIRSTA",response.data)
            if(response.data.Status==true){
              this.setState({loader: true}, ()=>{
                if (response.data.Status==true){
                    Snackbar.show({
                        title: response.data.Message,
                        duration: Snackbar.LENGTH_SHORT,
                        color: 'white'
                      });
                      this.setState({leaveid: response.data["leave_id "]}, ()=>{

                        axios.get(baseurl+`/leave/add-substitutions?leaveid=${this.state.leaveid}`,{
                            headers: {
                                'Content-type': 'multipart/form-data',
                                'Authorization': 'Token '+ this.state.token
                            }
                    })
                    .then(response => {
                        console.log(response.data)
                        const faqtemp = response.data["Applied Leave Details"].faculties;
                        console.log("LEM",faqtemp.length)
                        var faqbus=[]
                        for(i=0;i<faqtemp.length;i++){
                            faqbus=faqbus.concat(faqtemp[i])
                        }
                        console.warn(faqbus)

                        this.setState({possibleFaq: faqbus}, ()=>{
                          console.log("POSSIBLE EMP",this.state.possibleFaq)
                          this.setState({loader: false, status:2})
                        })
                    })
                    .catch(error => {
                      Alert.alert(
                        'Error',
                        'Something went wrong, please try again',
                        [
                          {text: 'Retry', onPress: () => this.setState({loader: false})},
                        ],
                        {cancelable: false},
                      );
                    });

                      })                                     
                   }
            })
            }else{
              Alert.alert(
                'Something went wrong',
                response.data.Message,
                [
                  {text: 'Retry', onPress: () => this.setState({loader: false})},
                ],
                {cancelable: false},
              );
            }
  
        })
        .catch(error => {
            Alert.alert(
              'Error',
              'Something went wrong, please try again',
              [
                {text: 'Retry', onPress: () => this.setState({loader: false})},
              ],
              {cancelable: false},
            );
        });
    

        }

      }


      onSubmitSecond=()=>{
        this.setState({loader2: true})
        const {selectedPeriodSub}=this.state
                if(this.state.p1.name=="Assign a Substitute"){
                  Alert.alert(
                    'Assign a Substitute',
                    'Please make sure that you asig substitute',
                    [
                      {text: 'OK', onPress: () => this.setState({loader2: false})},
                    ],
                    {cancelable: false},
                  );
                }
              else{
                  const formData2 = new FormData()
                  // const obj = this.state.selectedPeriodSub.reduce(function(result, current) {
                  //   return Object.assign(result, current);
                  // }, {})
                  this.setState({selectedPeriodSub: selectedPeriodSub.concat({"p1":this.state.p1.id, "ep":0, "ep_name": ''})},()=>{
          
                  formData2.append('leaveid',parseInt(this.state.leaveid));
                  formData2.append('data', JSON.stringify(this.state.selectedPeriodSub[0]))
          
                  console.log(JSON.stringify(this.state.selectedPeriodSub[0]))
          
                  axios.post(baseurl+"/leave/add-substitutions/",formData2,{
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': 'Token '+ this.state.token
                    }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.setState({loader2: false}, ()=>{
                          if(response.data.Status==true){
                            Alert.alert(
                              'Leave Submited',
                              'Your leave form has been submited',
                              [
                                {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                              ],
                              {cancelable: false},
                            );
                          }
                        })
                    })
                    .catch(error => {
                        console.warn(error.response.data.errors)
                        this.setState({loader2: false}, ()=>{
                          Alert.alert(
                            'Error',
                            'Something went wrong, please try again',
                            [
                              {text: 'Retry', onPress: () => console.log('Retry')},
                            ],
                            {cancelable: false},
                          );
                        })
                    });
                  })
                }
        }

    onPressPeriod=(key)=>{
        this.setState({currentPressedPeriod: key}, ()=>{
        this.toggleModal3()
      })
    }




    // [{"p1":16},{"p2":17},{"p3":18},{"p4":20}]

    onPressPeriodSub=(item)=>{
      const {selectedPeriodSub}=this.state
      switch(this.state.currentPressedPeriod){
        case 1: 
                this.setState({p1: item}, ()=>this.toggleModal3())
                break;

        // case 2: {return(
        //   this.setState({p2: item},()=>this.toggleModal3())
        // )}
        // case 3:{ return(
        //   this.setState({p3: item},()=>this.toggleModal3())
        // )}
        // case 4: {return(
        //   this.setState({p4: item},()=>this.toggleModal3())
        // )}
        // case 5: {return(
        //   this.setState({p5: item},()=>this.toggleModal3())
        // )}
        // case 6: {return(
        //   this.setState({p6: item},()=>this.toggleModal3())
        // )}
        // case 7: {return(
        //   this.setState({p7: item},()=>this.toggleModal3())
        // )}
      }
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
                       onChangeText={(text)=>this.setState({reasonText: text})}
                       value={this.state.reasonText}
                       />
                  </View>
    
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity disabled={this.state.loader} onPress={()=>this.onSubmitFirst()} style={{height: 40, width: 120, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#3A4277', borderRadius: 20 }}>
                        {this.state.loader ? <ActivityIndicator color='#3A4277' size='small' /> : <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_BOLD}}>Next</Text>}
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
                            <Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_SEMI}}>{this.state.startDate}</Text>
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
                                <TouchableOpacity onPress={()=>this.onPressPeriod(1)} style={{flex:1, marginHorizontal: 10, backgroundColor: 'white', flexDirection: "row"}}>
                                    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{this.state.p1.name}</Text>
                                    </View>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon name='arrow-back' size={15} color='#3A4277'/>
                                    </View>
                                </TouchableOpacity>
                        </View>
                  </View>

                  {/* <View style={{height: 30, justifyContent:'center', paddingHorizontal: 10}}>
                        <Text style={{color: '#3A4277', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Extra Duty</Text>
                  </View>

                  <View style={{height: 100, paddingHorizontal: 20,padding:10, backgroundColor: 'white', marginVertical: 10, margin:5}}>
                       <TextInput
                       style={{fontSize: 13, color: '#3A3A3A', fontFamily: Font.FONT_FAMILY_REG}}
                       placeholder={'Extra Duty (if there is any extra duty)'}
                       placeholderTextColor={'#3A3A3A'}
                       value={this.state.epname}
                       onChangeText={(t)=> this.setState({epname:t})}
                       />
                  </View>

                  <TouchableOpacity onPress={()=>this.onPressPeriod(7)} style={{height: 50, justifyContent: 'center', backgroundColor: 'white', margin: 5, marginVertical: 10, flexDirection: 'row'}}>
                      <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 20}}>
                          <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_REG}}>{this.state.p7.name}</Text>
                      </View>
                      <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
                          <Icon2 name='arrow-down-drop-circle' size={25} color='#3A3A3A' />
                      </View>
                  </TouchableOpacity> */}

                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity disabled={this.state.loader2} onPress={()=>this.onSubmitSecond()} style={{height: 40, width: 120, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#3A4277', borderRadius: 20 }}>
                        {this.state.loader2 ? <ActivityIndicator size='small' color={'#3A3A3A'} /> :<Text style={{color: '#3A4277', fontSize: 16, fontFamily: Font.FONT_FAMILY_BOLD}}>Submit</Text>}
                    </TouchableOpacity>
                  </View>

             </View>


                </View>
            )
        }
    }

    async goBackfn(){
        // this.props.navigation.goBack()
        if(this.state.status == 2){
            Alert.alert(
                'Cancel Leave',
                'Are you sure want to cancel the leave?',
                [
                  {text: 'Cancel Leave', onPress: () => {
                    const formData = new FormData()

                    formData.append('leaveid', this.state.leaveid );
  
                      axios.post(baseurl+'/leave/manage-leave/', formData ,{
                              headers: {
                                  'Content-type': 'multipart/form-data',
                                  'Authorization': 'Token '+ this.state.token
                              }
                      })
                      .then(response => {
                          console.log(response.data)
                          if(response.data.Status==true){
                              Snackbar.show({
                                  title: response.data.Message,
                                  duration: Snackbar.LENGTH_SHORT,
                                  color: 'white'
                              });
                              this.props.navigation.goBack()
                          }
                      })
                      .catch(error => {
                           console.warn(error.response)
                      });
                  }},
                  {text: 'Continue', onPress: ()=> console.log('Canceled'), style: 'cancel'} 
                ],
                {cancelable: false},
              );
        }
        else{
            this.props.navigation.goBack()
        }
    }


  render() {
    console.log(this.state.selectedPeriodSub)
    return (
      <View style={styles.mainContainer}>
          <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
              <View style={{flex:1,flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=>this.goBackfn()} style={{width: 60, justifyContent:"center", alignItems: 'center'}}>
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

                <TouchableOpacity onPress={()=>this.setState({leavefnState:'half_day', duration: 'Half Day Leave'}, ()=> this.toggleModal())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Half Day Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({leavefnState:'full_day', duration: 'Full Day Leave'}, ()=> this.toggleModal())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Full Day Leave</Text>
                </TouchableOpacity>

            </View>

          </View>
        </Modal>


        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible1}
          onConfirm={this.handleDatePicked1}
          onCancel={this.hideDateTimePicker1}
          minimumDate={new Date()}
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


            <TouchableOpacity onPress={()=>this.setState({leaveType:'Casual Leave', leaveTypeOg:'Casual Leave' }, ()=> this.toggleModal1())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Casual Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({leaveType:'Sick Leave', leaveTypeOg:'Sick Leave'}, ()=> this.toggleModal1())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Sick Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({leaveType:'Other', leaveTypeOg:'Other'}, ()=> this.toggleModal1())} style={{height: 40, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10}}>
                    <Text style={{color: '#3A3A3A', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>Other</Text>
                </TouchableOpacity>

            </View>

          </View>
        </Modal>

        <Modal 
        isVisible={this.state.isModalVisible3}
        onBackButtonPress={()=>this.toggleModal3()}
        onBackdropPress={()=>this.toggleModal3()}
        style={{height: 350, justifyContent: 'center', alignItems: 'center'}}
        >
          <View style={{height: 350, width: 300, backgroundColor: 'white'}}>

            <View style={{height: 60, justifyContent: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#3A4277'}}>
                <Text style={{color: '#3A3A3A', fontSize: 15, fontFamily: Font.FONT_FAMILY_BOLD}}>Select Substitute</Text>
            </View>
              {/* <FlatList
                data={this.state.possibleFaq}
                renderItem={({ item, index }) =>
                  <TouchableOpacity style={{height: 50, borderBottomWidth: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
                    <Text style={{color: 'black', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{item.name}</Text>
                  </TouchableOpacity>
                }
              /> */}
              <ScrollView style={{height: 350-60, width: 300}}>
              {this.state.possibleFaq.map((item, index)=>{
                  return(
                    <TouchableOpacity onPress={()=> this.onPressPeriodSub(item)} style={{height: 50, borderBottomWidth: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{item.name}</Text>
                    </TouchableOpacity>
                  )
              })}
              </ScrollView>
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