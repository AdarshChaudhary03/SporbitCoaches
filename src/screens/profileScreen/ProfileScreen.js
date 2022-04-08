import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { heightToDP } from "../../utils/utils";
import Header from "../constants/Header";
import AnimatedHeader from "./AnimatedHeader";
import CertificateView from "./CertificateView";
import EditProfileScreen from "./EditProfileScreen";
import PaymentScreen from "./PaymentScreen";
import ProfileMainScreen from "./profileMainScreen";
import Settings from "./Settings";
import CustomerSupport from "./settings/components/helpAndSupport/customerSupport";
import HelpAndSupportDetails from "./settings/components/helpAndSupport/customerSupport";
import FAQ from "./settings/components/helpAndSupport/faq";
import PrivacyPolicy from "./settings/components/helpAndSupport/privacyPolicy";
import RefundPolicy from "./settings/components/helpAndSupport/refundPolicy";
import TermsAndConditions from "./settings/components/helpAndSupport/termsAndConditions";
import SettingsScreen from "./settings/components/settingScreens/settingScreen";
import HelpAndSupport from "./settings/helpAndSupport";
import SignOut from "./SignOut";

const Stack = createStackNavigator();

const ProfileScreen = props => {

   const { user } = props;

   return (
    <NavigationContainer independent={true}>
    <Stack.Navigator headerMode="none">
       <Stack.Screen name='ProfileMainScreen' component={ProfileMainScreen} initialParams={{user: user}}/>
       <Stack.Screen name='PaymentScreen' component={PaymentScreen} initialParams={{user: user}}/>
       <Stack.Screen name='HelpAndSupport' component={HelpAndSupport} initialParams={{user: user}}/>
       <Stack.Screen name='HelpAndSupportDetails' component={HelpAndSupportDetails}/>
       <Stack.Screen name='FAQ' component={FAQ}/>
       <Stack.Screen name='CustomerSupport' component={CustomerSupport}/>
       <Stack.Screen name='RefundPolicy' component={RefundPolicy}/>
       <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
       <Stack.Screen name='TermsAndConditions' component={TermsAndConditions}/>
       <Stack.Screen name='SettingScreen' component={SettingsScreen}/>
       <Stack.Screen 
       name='EditProfileScreen' 
       component={EditProfileScreen} 
       initialParams={
          {
             user: user,
//             setUser: setCoach,
             }}/>
    </Stack.Navigator>
 </NavigationContainer> );
}

const styles = StyleSheet.create({
})

export default ProfileScreen;