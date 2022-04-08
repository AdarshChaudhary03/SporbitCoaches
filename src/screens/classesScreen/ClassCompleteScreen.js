import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { getCoach, getNextClass, getStudentsByDate } from "../../utils/getters";
import { addClassHistory } from "../../utils/setters";
import { heightToDP, widthToDP } from "../../utils/utils";
import firebaseSetup from './../../utils/setup';
const {auth, messaging, firestore} = firebaseSetup();

const ClassCompleteScreen = props => {

  const { batch, homework, media, students,setStudents, day, setClassComplete, user, curriculum } = props;
  const [ homeworkFlag, setHomeworkFlag ] = useState(false);

  const getStudentsList = async (selectedDay) => {
    setStudents([]);
      await getStudentsByDate(user.academy.id, selectedDay.dateString).then( async (students) => {
        for await (const student of students){
          if(student.attendance!==student.classes)
          setStudents(prevStudent => [...prevStudent,student]);
        }
        //console.log('student',student);
      });
  }


  const completeTask = async () => {
    ////console.log(students);
//    console.log(curriculum.length);
//    return;
    for await (const student of students){
      if(!student.isAttendanceDone && !student.isLayOff){
        alert('Kindly fill the attendance first for all the students showing on the screen.');
        return;
      }
    }
      if(batch==='' || batch==='value'){
        alert('Kindly select the batch.');
        return;
      }
      if(homework===''){
        alert('You haven\'t assigned any homework for today\'s class.');
        return;
    }
    if(curriculum.length===0){
      alert('You haven\'t assigned any curriculum for today\'s class.');
      return;
  }

    for await (const student of students){
      const data = {
        feedback: student.feedback,
        homework,
        homeworkDone: false,
        media,
        curriculum,
        batch,
        attendanceType: student.attendanceType,
        classDate: student.nextClass,
        classTimings: student.nextClassTime,
        isLayOff: student.isLayOff,
        layOffAvailed: student.isLayOff ? parseInt(student.layOffAvailed)+1 : parseInt(student.layOffAvailed),
        layOffAvailable: student.layOffAvailable,
        layOffStartDate: student.layOffStartDate,
        layOffEndDate: student.layOffEndDate,
        noOfLayOff: parseInt(student.noOfLayOff)-1
      }

      let newClassDate = await getNextClass(student.academy.id,student.batch);
      //console.log(newClassDate);

      //console.log(newClassDate.toLocaleTimeString());
      const classHistory = await addClassHistory(student.academy.id,student.uid,data,newClassDate);
    }
    await getStudentsList(day);
    setClassComplete(true);
    alert('Class created successfully.');  
}

    return (
        <View style={styles.feedbackRow}>
            <View style={styles.homeworkView}>
            <TouchableOpacity
        style={styles.booking}
        onPress={completeTask}>
        <Text style={styles.bookingTextLarge}>FINISH</Text>
        <Text style={styles.bookingTextSmall}>(Task complete)</Text>
      </TouchableOpacity>
            </View>
      </View>    
    );
}

const styles = StyleSheet.create({
  booking: {
//    position: 'absolute',
//    bottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: heightToDP('1%'),
    paddingHorizontal: widthToDP('10%'),
    backgroundColor: '#F17936',
    marginVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
  },
  bookingTextLarge: {
    fontSize: widthToDP('6%'),
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
  },
  bookingTextSmall: {
    fontSize: widthToDP('5%'),
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 1,
  },
    feedbackRow: {
        padding: heightToDP('3%'),
        marginHorizontal: widthToDP('4%'),
        marginBottom: widthToDP('7%'),
//        backgroundColor: '#fff',
        borderRadius: widthToDP('3%'),
        overflow: 'hidden',
          },
          homeworkView: {
            flexDirection: 'row',
            justifyContent: 'center',
          },
              feedbackRowTextMain: {
        color: '#000',
        fontFamily: 'Gilroy-SemiBold',
        fontSize: widthToDP('5%'),
      },
      feedbackRowTextSub: {
        color: '#6F6F6F',
        fontFamily: 'Gilroy-Regular',
        fontSize: widthToDP('4%'),
      },
        
})

export default ClassCompleteScreen;