import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../constants/Header";

const PaymentScreen = props => {

    const { navigation } = props;

    return (
        <View>
            <Header text="Payments" navigation={navigation}/>
            <Text>PaymentScreen</Text>
        </View>
    );
}

export default PaymentScreen;