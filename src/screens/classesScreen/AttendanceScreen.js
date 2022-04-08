import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightToDP, widthToDP } from "../../utils/utils";
import AttendanceList from "./AttendanceList";

const AttendanceScreen = props => {

    const { day, students, setStudents, batch,user } = props;

    return (
        <>
        <View style={styles.schedule}>
              <View style={styles.oldClass}>
              <Text style={styles.dateHeaderText}>
          { day ? new Date(day.dateString)
            .toUTCString()
            .split(' ')
            .slice(0, 3)
            .join(' ') : 
            new Date()
            .toUTCString()
            .split(' ')
            .slice(0, 3)
            .join(' ') 
            }
        </Text>
        <Text style={styles.dayDescription}>
          ATTENDANCE        
          </Text>
          <View style={styles.oldClassHeader}>
          <View style={[styles.oldClassColumnHeader, styles.flexTwo]}>
            <Text style={styles.oldClassHeaderText}>Student's Name</Text>
          </View>
          <View style={[styles.oldClassColumnHeader, styles.flexTwo]}>
            <Text style={styles.oldClassHeaderText}>Attendance</Text>
          </View>
        </View>

        <AttendanceList day={day} user={user} students={students} batch={batch} setStudents={setStudents}/>
            </View>
        </View>
                </>        
    );
}

const styles = StyleSheet.create({
    schedule: {
        marginVertical: heightToDP('4%'),
        paddingVertical: heightToDP('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthToDP('4%'),
        marginHorizontal: widthToDP('5%'),
        backgroundColor: '#fff',
      },
      oldClass: {
        width: '100%',
      },
      dateHeaderText: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: widthToDP('5%'),
        alignSelf: 'center',
        color: 'rgba(255, 4, 4, 1)',
      },
      dayDescription: {
        fontSize: widthToDP('5%'),
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'Gilroy-Regular',
        color: 'rgba(255, 4, 4, 1)',
      },
      oldClassHeader: {
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        paddingBottom: heightToDP('2%'),
      },
      oldClassColumnHeader: {
        justifyContent: 'center',
      },
      oldClassHeaderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: heightToDP('2%'),
        color: '#000',
        fontFamily: 'Gilroy-SemiBold',            
      },
      flexOne: {
        flex: 1,
      },
      flexTwo: {
        flex: 2,
      },
      oldClassRowTask: {
        justifyContent: 'center',
        marginLeft: widthToDP('3%'),
        flex: 1,
      },
      oldClassRowTaskTextMain: {
        color: '#000',
        fontFamily: 'Gilroy-SemiBold',
        fontSize: widthToDP('4%'),
      },
      oldClassRowTaskTextSub: {
        color: '#6F6F6F',
        fontFamily: 'Gilroy-SemiBold',
        fontSize: widthToDP('3%'),
      },
      oldClassRowPerformance: {
        width: '50%',
        alignItems: 'center',
      },
      oldClassRowPerformanceText: {
        textAlign: 'center',
        color: '#000',
        fontFamily: 'Gilroy-SemiBold',
        fontSize: widthToDP('5%'),
        borderBottomWidth: 2,
        borderBottomColor: '#b2b2b2',
        paddingBottom: 10,
      },
      oldClassRowPerformanceIncomplete: {
        borderTopWidth: 1,
        borderTopColor: '#b2b2b2',
        marginTop: 20,
        paddingVertical: 10,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      oldClassRowPerformanceTextIncomplete: {
        textAlign: 'center',
        color: '#b2b2b2',
        fontFamily: 'Gilroy-SemiBold',
        fontSize: widthToDP('5%'),
        width: '80%',
        paddingVertical: 10,
      },
                                })

export default AttendanceScreen;