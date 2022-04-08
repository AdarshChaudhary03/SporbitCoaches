import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Expand from '../../../assets/icons/courses/expand.svg';
import Compress from '../../../assets/icons/courses/compress.svg';
import { heightToDP, widthToDP } from '../../utils/utils';
import CheckMark from '../../../assets/icons/courses/checkmark.svg';
import RedCross from '../../../assets/icons/courses/redcross.svg';

const AttendanceItem = props => {
    const [expanded, setExpanded] = useState(false);
    const [ feedback, setFeedback ] = useState('');
    const { student } = props;
  
    const Icon = () => {
      if (!expanded) {
        return <Expand />;
      } else {
        return <Compress />;
      }
    };
  
    return(
<View style={ expanded
              ? styles.oldClassFooter
              : [styles.oldClassFooter, {height: heightToDP('6%')}]}>
          <View style={styles.oldClassRow}>
            <View style={styles.oldClassRowTime}>
              <Text style={styles.oldClassRowTimeText} numberOfLines={1}>
                {itemData ? itemData.item.playerName : ''}
              </Text>
            </View>
            <View style={styles.oldClassRowTime}>
                <View style={styles.btnContainer}>
                  { !itemData.item.isAttendanceDone ? (
                  <>
                  <TouchableOpacity onPress={() => presentOrAbsentStudent(itemData.item, 'Present')}>
                      <CheckMark/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => presentOrAbsentStudent(itemData.item, 'Absent')}>
                      <RedCross/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Icon />
        </TouchableOpacity>
                          </>
                  ) : <>
                  <Text></Text>
                  <Text style={itemData.item.attendanceType==='Present' ? {color: 'green'} : {color: 'red'}}>{itemData.item.attendanceType==='Present' ? 'Present' : 'Absent'}</Text>
                  <Text></Text>
                  </>
                  }
                  </View>
            </View>
              </View>
              <View style={styles.homework}>
              <TextInput 
          style={styles.homeworkContent}
          placeholder='Note down the homework to be provided to the students...'
        autoCorrect
        multiline
        value='{homework} '
        maxLength={200} 
        numberOfLines={4} />
              </View>
          </View>    );
}

const styles = StyleSheet.create({
    container: {
        padding: heightToDP('3%'),
        marginHorizontal: widthToDP('4%'),
        marginBottom: widthToDP('7%'),
        backgroundColor: '#fff',
        borderRadius: widthToDP('3%'),
        overflow: 'hidden',
      },
      homeworkView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      tabHeaderText: {
        fontSize: widthToDP('4.5%'),
        fontFamily: 'Gilroy-SemiBold',
        alignSelf: 'flex-start',
      },
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
        width: '50%',
      flexDirection: 'row',
      justifyContent: 'space-between' 
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
 
})

export default AttendanceItem;