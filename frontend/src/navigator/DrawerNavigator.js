import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../Screens/HomeScreen";
import TaskPlannerScreen from "../Screens/TaskPlannerScreen";
import LoginScreen from "../Screens/LoginScreen";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ArchiveScreen from "../Screens/ArchiveScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      // screenOptions={{ headerShown: false }}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#000000",
        drawerActiveBackgroundColor: "#f2f2f2",
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {user !== null && (
              <DrawerItem label="Logout" onPress={() => dispatch(logout())} />
            )}
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {user !== null && (
        <Drawer.Screen
          name="Task Planner"
          component={TaskPlannerScreen}
          options={{ unmountOnBlur: true }}
        />
      )}
      {user !== null && (
        <Drawer.Screen
          name="Archive"
          component={ArchiveScreen}
          options={{ unmountOnBlur: true }}
        />
      )}
      {user === null && <Drawer.Screen name="Login" component={LoginScreen} />}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
