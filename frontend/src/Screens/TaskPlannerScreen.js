import { ScrollView, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AndroidSafeAreaView from "../AndroidSafeAreaView";
import TaskPlanner from "../Components/TaskPlanner";
import { useNavigation } from "@react-navigation/native";

const TaskPlannerScreen = () => {
  const nav = useNavigation();

  return (
    <View style={AndroidSafeAreaView.AndroidSafeArea}>
      <ScrollView>
        <Icon
          name="menu"
          size={46}
          color="black"
          style={{ marginLeft: 300 }}
          onPress={() => nav.toggleDrawer()}
        />
        <TaskPlanner />
      </ScrollView>
    </View>
  );
};

export default TaskPlannerScreen;
