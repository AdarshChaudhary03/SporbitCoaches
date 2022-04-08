import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import Expand from '../../../assets/icons/courses/expand.svg';
import Compress from '../../../assets/icons/courses/compress.svg';
import { heightToDP, widthToDP } from '../../utils/utils';

const HomeworkView = (props) => {
  const [expanded, setExpanded] = useState(false);

  const { setHomework, homework } = props;

  const Icon = () => {
    if (!expanded) {
      return <Expand />;
    } else {
      return <Compress />;
    }
  };

  return (
    <View
      style={
        expanded
          ? styles.container
          : [styles.container, {height: heightToDP('9%')}]
      }>
      <View style={styles.homeworkView}>
        <Text style={styles.tabHeaderText}>Homework</Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Icon />
        </TouchableOpacity>
      </View>
      <View style={styles.homework}>
        <TextInput 
        style={styles.homeworkContent}
        placeholder='Note down the homework to be provided to the students...'
        autoCorrect
        multiline
        value={homework} 
        maxLength={200} 
        numberOfLines={4} 
        onChangeText={text => setHomework(text)}/>
      </View>
    </View>
  );
};
export default HomeworkView;

const styles = StyleSheet.create({
  container: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    marginBottom: widthToDP('7%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
  },
  homeworkContent: {
    justifyContent: 'flex-start',
  },
  homeworkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homework: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: heightToDP('5%'),
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
