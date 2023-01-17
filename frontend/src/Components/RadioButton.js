import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const RadioButton = () => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity onPress={() => setSelected(!selected)}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            marginRight: 10,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          },
          //   props.style,
        ]}
      >
        {selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "#000",
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;
