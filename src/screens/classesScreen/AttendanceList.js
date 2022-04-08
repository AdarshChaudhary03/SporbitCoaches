import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Button, RefreshControl, FlatList, TouchableOpacity, TextInput} from 'react-native'
import { getCoach, getStudents, getStudentsByBatch } from "../../utils/getters";
import { addAttendance } from "../../utils/setters";
import { heightToDP, widthToDP } from "../../utils/utils";
import EmptyList from "./EmptyList";
import CheckMark from '../../../assets/icons/courses/checkmark.svg';
import RedCross from '../../../assets/icons/courses/redcross.svg';
import CommentBox from '../../../assets/icons/courses/commentbox.svg';
import firebaseSetup from './../../utils/setup';
const {auth, messaging, firestore} = firebaseSetup();
import Expand from '../../../assets/icons/courses/expand.svg';
import Compress from '../../../assets/icons/courses/compress.svg';
import FeedbackModal from "./FeedbackModal";



const AttendanceList = props => {

    const { day, students, setStudents, batch, user } = props;
    const [refreshing, setRefreshing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ selectedIndex, setSelectedIndex ] = useState('');
    const [ feedback, setFeedback ] = useState('');
    const [ selectedStudent, setSelectedStudent ] = useState();
  
    const Icon = () => {
      if (!expanded) {
        return <Expand />;
      } else {
        return <Compress />;
      }
    };
  


    const presentOrAbsentStudent = async (student, type) => {
        const currentAttendance = student.attendance;
        const totalClasses = student.classes;
        if(currentAttendance === totalClasses){
            alert('Student got full attendance.');
        }
        else{
            addAttendance(student.academy.id,student.uid,currentAttendance+1,type)
            .then(() => {
                setStudents([]);
                getStudentsByBatch(user.academy.id,day.dateString,batch).then( async (students) => {
                  for await (const student of students){
                    if(student.attendance!==student.classes)
                    setStudents(prevStudent => [...prevStudent,student]);
                  }
                })
                alert('Attendance successfull.');    
            })
        }
    }

    
    const AttendanceItem = (itemData, index) => {
        return (
          <View style={styles.oldClassFooter}>
          <View style={styles.oldClassRow}>
            <View style={styles.oldClassRowTime}>
              <Text style={styles.oldClassRowTimeText} numberOfLines={1}>
                {itemData.item.playerName}
              </Text>
            </View>
            <View style={styles.oldClassRowTime}>
                <View style={styles.btnContainer}>
                  {
                  (itemData.item.isLayOff) ? (
                    <>
                  <Text></Text>
                  <Text style={{color: 'orange'}}>LAYOFF</Text>
                  <Text></Text>
                  </>
                  ) :
                  (!itemData.item.isAttendanceDone ? (
                  <>
                  <TouchableOpacity onPress={() => presentOrAbsentStudent(itemData.item, 'Present')}>
                      <CheckMark/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => presentOrAbsentStudent(itemData.item, 'Absent')}>
                      <RedCross/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setSelectedStudent(itemData.item);
                  setFeedback(itemData.item.feedback ? itemData.item.feedback : '');
                  setIsVisible(!isVisible)}}>
                      <CommentBox/>
                      <FeedbackModal selectedStudent={selectedStudent} day={day} student={itemData.item} setStudents={setStudents} batch={batch} feedback={feedback} setFeedback={setFeedback} isVisible={isVisible} setIsVisible={setIsVisible}/>
                </TouchableOpacity>
                          </>
                  ) : <>
                  <Text></Text>
                  <Text style={itemData.item.attendanceType==='Present' ? {color: 'green'} : {color: 'red'}}>{itemData.item.attendanceType==='Present' ? 'Present' : 'Absent'}</Text>
                  <Text></Text>
                  </>)
                  }
                  </View>
            </View>
              </View>
          </View>
        );
    }
  

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      },5000);
    }, []);

    ////console.log('day', day);
    ////console.log(students);
    return (
        <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={students}
        ListEmptyComponent={EmptyList}
        renderItem={AttendanceItem}
        keyExtractor={(item) => item.uid}
      />
                );
}

const styles = StyleSheet.create({
    oldClassFooter: {
        width: '100%',
      },
      oldClassRow: {
        flexDirection: 'row',
        paddingVertical: heightToDP('2%'),
        justifyContent: 'center',
      },
      oldClassRowTime: {
        alignItems: 'center',
        flex: 2,
      },
      oldClassRowTimeText: {
        color: 'black',
        fontFamily: 'Gilroy-Regular',
        fontSize: widthToDP('4%'),
      },
      btnContainer: {
          width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between' 
    },
    homeworkContent: {
      justifyContent: 'flex-start',
    },
    homework: {
      paddingBottom: heightToDP('1%'),
      paddingTop: heightToDP('1%'),
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 1,
      marginTop: heightToDP('5%'),
    },
  
})

export default AttendanceList;