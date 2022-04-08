import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getCoach, getStudents, getStudentsByDate } from '../../utils/getters';
import { widthToDP, heightToDP } from './../../utils/utils';
import firebaseSetup from './../../utils/setup';
import { setBatch } from 'react-redux/lib/utils/batch';
const {auth, messaging, firestore} = firebaseSetup();


const CalendarView = props => {

    const { day, setDay, setStudents, setBatch, user } = props;
    const currentDate = new Date().getFullYear()+'-'+('0' + (new Date().getMonth()+1)).slice(-2)+'-'+('0' + (new Date().getDate())).slice(-2);
    const maxDate = new Date().getFullYear()+50+'-'+('0' + (new Date().getMonth())).slice(-2)+'-'+('0' + (new Date().getDate())).slice(-2);
    console.log('date',currentDate);

    const getStudentsList = async (selectedDay) => {
      setStudents([]);
        await getStudentsByDate(user.academy.id, selectedDay.dateString).then(students => {
          for (const student of students){
            if(student.attendance!==student.classes)
            setStudents(prevStudent => [...prevStudent, student]);
          }
        });
    }

    useEffect(() => {
        getStudentsList(day);
    },[])

    return (
        <View>
                  <Calendar
        theme={{
          backgroundColor: 'white',
          calendarBackground: '#F2F2F2',
          textSectionTitleColor: '#6F6F6F', //dayHeaderTextColor
          selectedDayTextColor: 'black',
          dayTextColor: '#ff5959', //other month day text color
          arrowColor: 'black',
          todayTextColor: '#FF5959',
          monthTextColor: 'black',
          textDayFontFamily: 'Gilroy-SemiBold',
          textMonthFontFamily: 'Gilroy-Regular',
          textDayHeaderFontFamily: 'Gilroy-Regular',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'normal',
          textDayFontSize: 16,
          textMonthFontSize: widthToDP('7%'),
          textDayHeaderFontSize: 14,
        }}
        hideExtraDays={true}
        minDate={currentDate}
        maxDate={maxDate}
        onDayPress={(selectedDay) => {
          setDay(selectedDay);
          getStudentsList(selectedDay);
//          setBatch('value');
          ////console.log('selected day', selectedDay);
        }}
        monthFormat={'MMM yyyy'}
        onMonthChange={(month) => {
          ////console.log('month changed', month);
        }}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        markedDates={{
            [day.dateString]: {
                selected: true,
    disableTouchEvent: true,
    selectedColor: '#F1EFFE',
    selectedTextColor: '#7954FA',
    

            }
        }}
        enableSwipeMonths={true}
        markingType={'custom'}
        style={styles.calendarItem}
      />
        </View>
    );
}

const styles = StyleSheet.create({
    calendarItem: {
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      paddingTop: heightToDP('8%'),
    },
  });
  

export default CalendarView;