import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStudents } from "../../utils/getters";
import { heightToDP } from "../../utils/utils";
import BatchSelection from "../classesScreen/BatchSelection";
import Header from "../constants/Header";
import StudentList from "./StudentList";

const StudentMainScreen = ({route}) => {
    const [ batch, setBatch ] = useState('value');
    const [ students, setStudents ] = useState([]);
    const navigation = useNavigation();

    const { user } = route.params;

    console.log('navigation',navigation);

    const fetchStudents = async () => {
        setStudents([]);
        await getStudents(user.academy.id).then(student => {
            setStudents(student);
        })
    }

    useEffect(() => {
        fetchStudents();
    },[])

    return (
        <View>
        <Header text={'Students'} />
        <View style={styles.itemContainer}>
        { false ? <BatchSelection/>: null}   
        <StudentList students={students} setStudents={setStudents} fetchStudents={fetchStudents}/>
        </View>
    </View>

    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: heightToDP('10%')
    }

});

export default StudentMainScreen;