import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PhoneScreen from "../phoneAuth/PhoneScreen";
import HomeTab from "./homeTab";

const Stack = createStackNavigator();

const HomeStackScreen = (props) => {
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator>
           <Stack.Screen name='homeTab' component={HomeTab} initialParams={{user: props.user}} options={{title : '', headerShown: false}}/>
           <Stack.Screen name='phoneScreen' component={PhoneScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
     </NavigationContainer> 
    );
}

export default HomeStackScreen;