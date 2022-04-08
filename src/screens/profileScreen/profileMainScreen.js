import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { heightToDP } from "../../utils/utils";
import Header from "../constants/Header";
import AnimatedHeader from "./AnimatedHeader";
import CertificateView from "./CertificateView";
import Settings from "./Settings";
import SignOut from "./SignOut";

const ProfileMainScreen = ({route}) => {

    const { user } = route.params;
    return (
        <View>
        <Header text={'Profile'} />
        <ScrollView style={styles.profileContainer}>
      <AnimatedHeader coach={user}/>
      <CertificateView/>
      <Settings/>
      <SignOut/>
    </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        marginTop: heightToDP('10%')
    }

})

export default ProfileMainScreen;