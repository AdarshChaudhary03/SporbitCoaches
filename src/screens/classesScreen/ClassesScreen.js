import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from "../constants/Header";
import AttendanceScreen from "./AttendanceScreen";
import BatchSelection from "./BatchSelection";
import CalendarView from "./CalendarView";
import ClassCompleteScreen from "./ClassCompleteScreen";
import FeedbackScreen from "./FeedbackScreen";
import MediaScreen from "./MediaScreen";
import HomeworkScreen from "./HomeworkScreen";
import NoActionView from "./NoActionView";
import CurriculumScreen from "./curriculumScreen";


const calcFormat = (date) => {
    let month;
    if (date.split(' ')[1] === 'Jan') {
      month = '01';
    }
    if (date.split(' ')[1] === 'Feb') {
      month = '02';
    }
    if (date.split(' ')[1] === 'Mar') {
      month = '03';
    }
    if (date.split(' ')[1] === 'Apr') {
      month = '04';
    }
    if (date.split(' ')[1] === 'May') {
      month = '05';
    }
    if (date.split(' ')[1] === 'Jun') {
      month = '06';
    }
    if (date.split(' ')[1] === 'Jul') {
      month = '07';
    }
    if (date.split(' ')[1] === 'Aug') {
      month = '08';
    }
    if (date.split(' ')[1] === 'Sep') {
      month = '09';
    }
    if (date.split(' ')[1] === 'Oct') {
      month = '10';
    }
    if (date.split(' ')[1] === 'Nov') {
      month = '11';
    }
    if (date.split(' ')[1] === 'Dec') {
      month = '12';
    }
    return date.split(' ')[3]+'-' + month + '-' + date.split(' ')[2];
  };

const ClassesScreen = props => {
    const [ students, setStudents ] = useState();
    const [ batch, setBatch ] = useState('value');
    const [ homework, setHomework ] = useState('');
    const [ media, setMedia ] = useState([]);
    const [ curriculum, setCurriculum ] = useState([]);
    const [ classComplete, setClassComplete ] = useState(false);
    const currentDate = new Date();
    const [ day, setDay] = useState({
        dateString: calcFormat(currentDate.toDateString()),
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        timestamp: currentDate.getTime(),
        year: currentDate.getFullYear()
    });

    const { user } = props;
    
return (
    <ScrollView>
        <Header text={'Classes'} />
       <CalendarView user={user} day={day} setDay={setDay} setBatch={setBatch} setStudents={setStudents}/>
         <BatchSelection user={user} mode={'classes'} day={day} setStudents={setStudents} setBatch={setBatch} batch={batch}/>
        <AttendanceScreen 
        day={day} 
        user={user}
        batch={batch} 
        students={students} 
        setStudents={setStudents}
        />
        { true ? null : <FeedbackScreen/>}
        { (batch=== 'value' || students.length===0) ? null : <HomeworkScreen homework={homework} setHomework={setHomework}/>}
        { (batch=== 'value' || students.length===0) ? null : <MediaScreen media={media} setMedia={setMedia} students={students} />}
        { (batch=== 'value' || students.length===0) ? null : <CurriculumScreen curriculum={curriculum} setCurriculum={setCurriculum} students={students} />}
        { (batch=== 'value' || students.length===0) ? null : <ClassCompleteScreen
        user={user}
        media={media}
        homework={homework}
        batch={batch}
        students={students}
        curriculum={curriculum}
        setClassComplete={setClassComplete}
        setStudents={setStudents}
        day={day}
        />}        
        { false ? <NoActionView/> : null}

        </ScrollView>
        );
}

const styles = StyleSheet.create({

})

export default ClassesScreen;