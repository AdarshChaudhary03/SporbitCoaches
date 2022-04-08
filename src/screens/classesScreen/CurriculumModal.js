import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, Button } from "react-native";
import RedCross from '../../../assets/icons/courses/redcross.svg';
import { getStudents } from "../../utils/getters";
import { addOrUpdateFeedback } from "../../utils/setters";
import { heightToDP, widthToDP } from "../../utils/utils";
import AvailableMediaList from "./AvailableMediaList";
import RedCrossExit from '../../../assets/icons/courses/redcross.svg';
import { ScrollView } from "react-native-gesture-handler";
import AvailableCurriculumList from "./AvailableCurriculumList";


const CurriculumModal = props => {

    const { isVisible, setIsVisible, availableCurriculum , curriculum , setCurriculum } = props;

    return (
            <Modal
            transparent={true}
            backdropColor = {'white'}
            backdropOpacity = {1}
            animationType='fade'
            visible={isVisible}
            onRequestClose={() => setIsVisible(!isVisible)}
            >
                <View style={styles.modalBox}>
                <View style={styles.closeItem}>
                <TouchableOpacity onPress={() => {
                    setIsVisible(false)}}>
                <RedCrossExit/>
                </TouchableOpacity>
                </View>
                <ScrollView>
                        <AvailableCurriculumList curriculum={curriculum} setCurriculum={setCurriculum} availableCurriculum={availableCurriculum} isVisible={isVisible} setIsVisible={setIsVisible}/>
                </ScrollView>
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
        width: widthToDP('100%'),
        height: heightToDP('100%'),
        backgroundColor: 'lightgray',
        borderRadius: 10,
        borderWidth: 0,
        borderColor: 'black',        
      }
})

export default CurriculumModal;