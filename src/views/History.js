import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Font from '../font'
import {Calendar} from 'react-native-calendars';
const{width,height}=Dimensions.get('window')



export default class History extends Component {


  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{height: 60, backgroundColor: 'white', elevation: 5, borderBottomWidth:0.3, borderColor: '#D9D9D9'}}>
            <View style={{flex:1,flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{width: 60, justifyContent:"center", alignItems: 'center'}}>
                    <Icon2 name='arrow-back' size={20} color='#3A4277'/>
                </TouchableOpacity>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal:0}}>
                    <Text style={{color: '#3A4277', fontSize: 18, fontFamily: Font.FONT_FAMILY_BOLD}}>Leave History</Text>
                </View>
            </View>
        </View>

        <View style={{height: 350}}>

        <Calendar
        style={{
            marginTop: 10,
            borderWidth: 0,
            borderColor: 'gray',
            height: 350
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#3A4277',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#3A4277',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#3A4277',
            monthTextColor: '#3A4277',
            indicatorColor: '#3A4277',
            textDayFontFamily: Font.FONT_FAMILY_SEMI,
            textMonthFontFamily: Font.FONT_FAMILY_SEMI,
            textDayHeaderFontFamily: Font.FONT_FAMILY_SEMI,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12
          }}
            // Initially visible month. Default = Date()
            current={new Date()}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2019-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2022-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {console.log('selected day', day)}}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}

            markedDates={{
                '2019-08-08': {selected: true, marked: true, selectedColor: '#3A4277'},
                '2019-08-03': {selected: true, marked: true, selectedColor: '#3A4277'},
                '2019-08-16': {selected: true, marked: true, selectedColor: '#3A4277'},
                '2019-08-17': {marked: true},
                '2019-08-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                '2019-08-19': {disabled: true, disableTouchEvent: true}
              }}
            />

        </View>
        
    <ScrollView style={{flex:1}}>

    <View style={{alignItems: 'center', flex:1, marginTop: 0}}>

    <View style={{height: 150, width: width-20, borderRadius: 10, backgroundColor: '#DDD8F5', marginTop: 10}}>
        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'white', flexDirection:'row'}}>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{width:40, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='calendar' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>25 July 2019</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Icon name='medical-bag' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{'Casual Leave'}</Text>
                </View>
            </View>
        </View>

        <View style={{flex:1,justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{'Reason For Leave'}</Text>
        </View>
        

    </View>

    <View style={{height: 150, width: width-20, borderRadius: 10, backgroundColor: '#DDD8F5', marginTop: 10}}>
        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'white', flexDirection:'row'}}>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{width:40, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='calendar' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>25 July 2019</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Icon name='medical-bag' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{'Casual Leave'}</Text>
                </View>
            </View>
        </View>

        <View style={{flex:1,justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{'Reason For Leave'}</Text>
        </View>
        

    </View>

    <View style={{height: 150, width: width-20, borderRadius: 10, backgroundColor: '#DDD8F5', marginTop: 10}}>
        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'white', flexDirection:'row'}}>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{width:40, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='calendar' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>25 July 2019</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Icon name='medical-bag' size={20} color={'#AFAFAF'} />
                </View>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{'Casual Leave'}</Text>
                </View>
            </View>
        </View>

        <View style={{flex:1,justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Text style={{color: '#AFAFAF', fontSize: 13, fontFamily: Font.FONT_FAMILY_SEMI}}>{'Reason For Leave'}</Text>
        </View>
        

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
