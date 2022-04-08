import React from "react";
import { StyleSheet } from 'react-native';
import { heightToDP } from "../../utils/utils";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StudentMainScreen from "./StudentMainScreen";
import EditProfileScreen from "../profileScreen/EditProfileScreen";
import StudentDetailScreen from "./StudentDetailScreen";
import RatingScreen from "./RatingScreen";

const Stack = createStackNavigator();


const StudentScreen = props => {

    const { user } = props;
    console.log('user',user);

return (
    <NavigationContainer independent={true}>
    <Stack.Navigator headerMode="none">
       <Stack.Screen name='StudentMainScreen' component={StudentMainScreen} initialParams={{user: user}}/>
       <Stack.Screen name='StudentDetailScreen' component={StudentDetailScreen} />
       <Stack.Screen name='RatingScreen' component={RatingScreen} />
    </Stack.Navigator>
 </NavigationContainer>     
);
}

export default StudentScreen;