import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AndroidSafeAreaView from "../AndroidSafeAreaView";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import React, { useState, useEffect } from "react";

const LoginScreen = () => {
  const { navigate, toggleDrawer } = useNavigation();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useEffect(() => {
    if (isError) {
      Alert.alert("Error:", message);
    }

    if (isSuccess || user) {
      navigate("Main", { screen: "Home" });
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = () => {
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <View style={AndroidSafeAreaView.AndroidSafeArea}>
      <Icon
        name="menu"
        size={46}
        color="black"
        style={{ marginLeft: 300 }}
        onPress={() => toggleDrawer()}
      />
      <View style={styles.loginform}>
        <Text style={styles.header}>Login:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        />
        {isLoading && <ActivityIndicator size="small" color="black" />}
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
        <Pressable onPress={() => navigate("Signup")}>
          <Text style={styles.register}>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  loginform: {
    marginTop: 40,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 250,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 100,
    height: 40,
    marginTop: 5,
    marginLeft: 150,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  register: {
    marginLeft: 170,
    marginTop: 6,
    fontSize: 16,
    fontWeight: "800",
  },
});

export default LoginScreen;
