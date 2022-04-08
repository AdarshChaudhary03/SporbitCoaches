import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, Button } from "react-native";
import RedCross from '../../../assets/icons/courses/redcross.svg';
import { getStudents } from "../../utils/getters";
import { addOrUpdateFeedback } from "../../utils/setters";
import { heightToDP, widthToDP } from "../../utils/utils";

const FeedbackModal = props => {

    const { isVisible, setIsVisible, feedback, setFeedback, student, setStudents, day, batch, selectedStudent } = props;

    const saveFeedback = async () => {
        //console.log('batch',batch);
        //console.log('feedback',feedback);
        //console.log('day',day.dateString);
        //console.log('student',selectedStudent.uid);
        if(feedback==='' || feedback===null || feedback==='undefined'){
            alert('Kindly fill feedback to save it.');
            return;
        }
        const fid = await addOrUpdateFeedback(selectedStudent.academy.id,selectedStudent.uid,feedback);
        setStudents([]);
        await getStudents(student.academy.id,day.dateString,batch).then(student => {
           setStudents(student);
        });
        alert('Feedback saved successfully.');
        setIsVisible(!isVisible);
    }


    return (
            <Modal
            transparent={true}
            backdropColor = {'white'}
            backdropOpacity = {1}
            animationType='fade'
            visible={isVisible}
            onRequestClose={() => setIsVisible(!isVisible)}
            >
                <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
    <View style={styles.modalBox}>
                <View style={styles.closeItem}>
                <TouchableOpacity onPress={() => {
                    ////console.log(isVisible);
                    setIsVisible(false)}}>
                <RedCross/>
                </TouchableOpacity>
                </View>
    <View style={styles.homework}>
        <Text>Feedback {selectedStudent ? selectedStudent.playerName : ''}</Text>
        <TextInput 
        style={styles.homeworkContent}
        placeholder='Note down the feedback to be provided to the student...'
        autoCorrect
        multiline
        value={feedback} 
        maxLength={200} 
        numberOfLines={4} 
        onChangeText={text => {
            setFeedback(text)}}/>
        <View style={styles.btn}>
        <Button title="Save" onPress={saveFeedback}/>
        </View>
    </View>
    </View>
  </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        width: '10%',
        backgroundColor: 'white',
        margin: 15, 
        alignItems: undefined,
        justifyContent: undefined,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10
      },
      btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: heightToDP('2%')
      },
      homework: {
        padding: heightToDP('2%'),
        borderColor: 'black',
        marginTop: heightToDP('1%'),
      },
          homeworkContent: {
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
      },
          closeItem: {
          padding: widthToDP('5%'),
          alignItems: 'flex-end'
      },
      modalBox: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'black'
      }
})

export default FeedbackModal;