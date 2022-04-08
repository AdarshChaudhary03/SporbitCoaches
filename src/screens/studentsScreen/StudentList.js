import React from "react";
import { StyleSheet, View, Text, FlatList, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import StudentItem from "./StudentItem";
import EmptyList from './../classesScreen/EmptyList';
import { heightToDP, widthToDP } from "../../utils/utils";
import { useNavigation } from "@react-navigation/native";

const StudentList = props => {

const { students,fetchStudents,setStudents } = props;
const navigation = useNavigation();

const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchStudents().then(() => setRefreshing(false));
  }, []);

//console.log(students);

    return (
        <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>Student Name</Text>    
        <Text style={styles.headerText}>Attendance</Text>    
        <Text style={styles.headerText}>Actions</Text>    
        </View>    
        <FlatList
        data={students ? students.sort((a,b) => a.playerName.localeCompare(b.playerName)) : null}
        ListEmptyComponent={EmptyList}
        renderItem={(itemData,index) => <StudentItem item={itemData} setStudents={setStudents}/>}
        keyExtractor={student => student.uid}
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>
        }
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: 'black',
        margin: widthToDP('4%'),
        padding: heightToDP('2%'),
        height: heightToDP('75%')
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: heightToDP('1%'),
        marginTop: heightToDP('1%'),
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: heightToDP('2%'),
        color: '#000',
        fontFamily: 'Gilroy-SemiBold',            
    }
})

export default StudentList;