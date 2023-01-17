import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const TabOptions = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 60,
      }}
    >
      <TouchableOpacity
        onPress={() => setSelectedIndex(1)}
        style={
          selectedIndex === 1 ? { ...style.tab, ...style.selected } : style.tab
        }
      >
        <Text>Movies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelectedIndex(2)}
        style={
          selectedIndex === 2 ? { ...style.tab, ...style.selected } : style.tab
        }
      >
        <Text>Books</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  tab: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "grey",
  },
});

export default TabOptions;
