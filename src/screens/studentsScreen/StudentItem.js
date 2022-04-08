import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Button } from "react-native";
import { heightToDP, widthToDP } from "../../utils/utils";
import Star from './../../../assets/icons/profile/badges/star.svg';
import Tick from './../../../assets/icons/courses/checkmark.svg';
import ViewStat from './../../../assets/icons/profile/others/stats.svg';
import { useNavigation } from "@react-navigation/native";

const StudentItem = (props,index) => {

    const navigation = useNavigation();

    const { item, setStudents } = props;
    console.log('item',item);


    return (
        <View style={styles.container}>
            <Text>{item.item.playerName}</Text>
            <View>
            <Text>{item.item.attendance}/{item.item.classes}</Text>
            </View>
            <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => {
                console.log('student',navigation);
                navigation.navigate('StudentDetailScreen', {user: item});
            }}>    
            <ViewStat/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('RatingScreen', {user: item, setStudents:setStudents});
            }}>
            {item.item.isRatingDone ? <Tick/> : <Star/>}
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: heightToDP('1%'),
        padding: heightToDP('2%'),
        width: widthToDP('110%'),
        backgroundColor: '#fff',
        marginLeft: widthToDP('-11%')
    },
    itemContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: widthToDP('15%')
    }
})

export default StudentItem;