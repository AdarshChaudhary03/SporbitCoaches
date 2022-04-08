import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { heightToDP } from "../../utils/utils";

const ClassHistoryTable = (props) => {

    return (
        <View style={styles.container}>
            <Text>{props.index + 1}</Text>
            <Text>{props.item.classDate.toDate().toString().substring(0,16)}</Text>
            <Text>{props.item.attendanceType}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: heightToDP('1%'),
        padding: heightToDP('2%'),
        backgroundColor: '#fff',
    }
})

export default ClassHistoryTable;