import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import { heightToDP, widthToDP } from '../../utils/utils';
import { Picker } from '@react-native-picker/picker';
import { getBatch, getCoach, getStudents, getStudentsByBatch, getStudentsByDate } from '../../utils/getters';
import firebaseSetup from './../../utils/setup';
const {auth, messaging, firestore} = firebaseSetup();


const BatchSelection = (props) => {

    const { setBatch, batch, day, setStudents, mode, user } = props;
    const [batches, setBatches ] = React.useState([]);

    const fetchStudents = async (item) => {
      setStudents([]);
      await getStudentsByBatch(user.academy.id,day.dateString,item).then(students => {
        for (const student of students){
          if(student.attendance!==student.classes || mode==='student')
          setStudents(prevStudent => [...prevStudent, student]);
        }
    })
    }

    const fetchBatches = async () => {
//      const coach = await getCoach(user.phoneNumber);
        setBatches([]);
       ////console.log(coach.batches);
       for await (const batch of user.batches){
        const batchItem = await getBatch(user.academy.id,batch);
        ////console.log('batchItem',batchItem);
        setBatches(prevArray => [...prevArray, batchItem]);
       }
    }

    React.useEffect( () => {
        fetchBatches();
    },[]);

  return (
    <View style={styles.container}>
      <View style={styles.homeworkView}>
        <Picker
        mode='dropdown'
        selectedValue={batch}
        style={styles.pickerBox}
        prompt="Choose the Batch"
        onValueChange={(itemValue, itemIndex) => {
            setBatch(itemValue);
            fetchStudents(itemValue);
            }}>
            <Picker.Item key='value' label='Choose the batch' value='value'/>
            {Object.keys(batches).map(batch => {
            return <Picker.Item key={batches[batch].id} label={batches[batch].id} value={batches[batch].uid}/>                
            })}                
        </Picker>
      </View>
    </View>
  );
};
export default BatchSelection;

const styles = StyleSheet.create({
    pickerBox: {
        height: heightToDP('5%'),
        width: widthToDP('70%')
    },
  container: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
  },
  homeworkView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  homework: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
  },
  homeworkRow: {
    flexDirection: 'row',
    paddingTop: heightToDP('1%'),
  },
  homeworkText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  homeworkDateText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
  tabHeaderText: {
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'flex-start',
  },
  checkbox: {
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('5%'),
  },
  markDone: {
    fontFamily: 'Gilroy-SemiBold',
    color: '#6F6F6F',
  },
});
