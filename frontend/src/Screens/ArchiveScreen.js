import { ScrollView, View } from "react-native";
import AndroidSafeAreaView from "../AndroidSafeAreaView";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import ArchiveList from "../Components/ArchiveList";
import { useNavigation } from "@react-navigation/native";


const ArchiveScreen = () => {
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
        <ArchiveList />
      </ScrollView>
    </View>
  );
};

export default ArchiveScreen;
