import React, { useState } from "react";
import Constant from "expo-constants";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Modal,
} from "react-native";

export default function App() {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [homeModel, showHomeModel] = useState(false);

  const loginFunction = async () => {
    if (!loginID || !password) {
      setHasError(true);
    } else {
      setHasError(false);
      setLoading(true);

      try {
        const res = await fetch(
          "https://api.icndb.com/jokes/random?firstName=Dipen&lastName=Patel"
        );
        const result = await res.json();
        console.log(result);

        if (result.type == "success") {
          showHomeModel(true);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    }
  };

  return (
    <View style={appStyle.container}>
      <TextInput
        placeholder="Enter login id"
        style={appStyle.textInput}
        value={loginID}
        onChangeText={(text) => {
          setLoginID(text);
        }}
      />
      <TextInput
        placeholder="Enter password"
        style={appStyle.textInput}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      {hasError && <Text style={appStyle.textError}>Please check input</Text>}
      {loading && (
        <ActivityIndicator
          style={appStyle.activityIndicator}
          size="large"
          color="#0000ff"
        />
      )}
      <Button
        title="Login"
        onPress={() => {
          loginFunction();
        }}
      />

      <Modal
        visible={homeModel}
        animationType="slide"
        onRequestClose={() => {
          showHomeModel(false);
        }}
      >
        <View style={appStyle.container}>
          <Text style={[appStyle.textHeader, { color: "#00FF00" }]}>
            Login success
          </Text>
          <Button
            title="Back to login"
            onPress={() => {
              showHomeModel(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252250",
    padding: 20,
    marginTop: Constant.statusBarHeight,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 10,
  },
  activityIndicator: {
    padding: 20,
  },
  textHeader: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textError: {
    color: "#FF0000",
  },
});
