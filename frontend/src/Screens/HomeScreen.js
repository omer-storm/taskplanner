import { View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AndroidSafeAreaView from "../AndroidSafeAreaView";
import WeatherCard from "../Components/WeatherCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const nav = useNavigation();

  return (
    <View style={AndroidSafeAreaView.AndroidSafeArea }>
      <Icon
        name="menu"
        size={46}
        color="black"
        style={{ marginLeft: 300 }}
        onPress={() => nav.toggleDrawer()}
      />
      <WeatherCard />
    </View>
  );
};

export default HomeScreen;
