import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "../Account";
import Home from "../Home";
import OTPScreen from "../phoneAuth/OTPScreen";
import PhoneScreen from "../phoneAuth/PhoneScreen";
import SplashScreen from "../phoneAuth/splashScreen";
import HomeTab from "./homeTab";

const Stack = createStackNavigator();


const RootStackScreen = () => {
    return (
        <NavigationContainer independent={true} >
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name='SplashScreen' component={SplashScreen}/>
        </Stack.Navigator>
     </NavigationContainer> 
    );
}

export default RootStackScreen;