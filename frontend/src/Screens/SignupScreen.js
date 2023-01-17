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
import { register, reset } from "../features/auth/authSlice";
import React, { useState, useEffect } from "react";

const SignupScreen = () => {
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [fullname, onChangeFullName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

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
    if (password !== confirmPassword) {
      Alert.alert("Error:", "Passwords do not match");
    } else {
      const userData = {
        name: fullname,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <View style={AndroidSafeAreaView.AndroidSafeArea}>
      <Icon
        name="arrow-back-circle-outline"
        size={46}
        color="black"
        style={{ marginLeft: 300 }}
        onPress={() => goBack()}
      />
      <View style={styles.loginform}>
        <Text style={styles.header}>Signup:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFullName}
          placeholder="Full Name"
          value={fullname}
        />
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
        <TextInput
          style={styles.input}
          onChangeText={onChangeConfirmPassword}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={true}
        />
        {isLoading && <ActivityIndicator size="small" color="black" />}
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.text}>Register</Text>
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
    // marginRight: 140,
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

export default SignupScreen;
