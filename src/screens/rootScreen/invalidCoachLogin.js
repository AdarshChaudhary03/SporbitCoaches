import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebaseSetup from './../../utils/setup';
const {firestore, storage, auth} = firebaseSetup();

const InvalidCoachLogin = props => {
return (
    <View>
        <Text>No Coach assigned with this phone number.</Text>
        <Button title="Sign out" onPress={() => auth().signOut()}/>
    </View>
);
}

const styles = StyleSheet.create({

});

export default InvalidCoachLogin;