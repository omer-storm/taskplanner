import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "../Screens/SignupScreen";
import DrawerNavigator from "./DrawerNavigator";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Main" component={DrawerNavigator} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
