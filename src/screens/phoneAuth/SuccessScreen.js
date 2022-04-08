import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ProfileScreen from './../profileScreen/ProfileScreen';
import StudentScreen from './../studentsScreen/StudentsScreen';
import ClassesScreen from './../classesScreen/ClassesScreen';

//const Tab = createBottomTabNavigator();

export default SuccessScreen = ({ route: { params: { phoneNumber } }, navigation }) => {
    const openHomePress = () => {
        navigation.navigate('home');
    }
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
    },
    btnText: {
        color: 'black',
        fontSize: 25,
        alignSelf:'center',
        fontWeight: 'bold',
    },
});