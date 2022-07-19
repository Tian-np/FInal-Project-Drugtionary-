import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,Picker
} from "react-native";

import { auth } from "../../firebase.js";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#F9F8FF",
    flex: 1,

    // Set content's vertical alignment.
    justifyContent: "center",

    // Set content's horizontal alignment.
    alignItems: "center",

    // Set hex color code here.
  },
  logo: {
    width: 300,
    height: 80,
  },
  logo2: {
    width: 230,
    height: 40,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  input2: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#72AAFF",
    padding: 10,
    borderRadius: 10,
    width: 100,
    margin: 12,
  },
  button2: {
    padding: 10,
    margin: 8,
  },
  button3: {},
  text: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const loginScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLasname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [birth, setBirth] = useState(0);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const axios = require("axios");

  useEffect(() => {
    const Component = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("logged");
      }
      return Component;
    });
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Sign up with:", user.email);
        createUser()
      })
      
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Login with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const createUser = () => {
    const User = {
      email: email,
      password: password,
      name: name,
      lastname: lastname,
      gender: gender,
      age: age,
      birth: birth,
      uid: auth.currentUser.uid
    };
    axios.post("http://192.168.1.7:5000/api/user", User);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Register</Text>
            <TextInput
              type="email"
              style={styles.input2}
              placeholder={"E-Mail"}
              onChangeText={setEmail}
            />
            <TextInput
              type="Password"
              secureTextEntry={true}
              style={styles.input2}
              placeholder={"Password"}
              onChangeText={setPassword}
            />
            <TextInput
              type="text"
              style={styles.input2}
              placeholder={"Name"}
              onChangeText={setName}
            />
            <TextInput
              type="text"
              style={styles.input2}
              placeholder={"Lastname"}
              onChangeText={setLasname}
            />

<Picker
        selectedValue={gender}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="ชาย" value="Male" />
        <Picker.Item label="หญิง" value="Female" />
      </Picker>
            <TextInput
              type="int"
              style={styles.input2}
              placeholder={"Age"}
              onChangeText={setAge}
            />

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSignUp}
              >
                <Text style={styles.textStyle}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Image style={styles.logo} source={require("../../assets/icon1.png")} />
      <SafeAreaView>
        <TextInput
          type="email"
          style={styles.input}
          placeholder={"E-Mail"}
          onChangeText={setEmail}
        />
        <TextInput
          type="password"
          secureTextEntry={true}
          style={styles.input}
          placeholder={"Password"}
          onChangeText={setPassword}
        />

        <View style={{ alignItems: "center", flexDirection: "row-reverse" }}>
          <Text style={{ color: "#72AAFF" }}>forget password?</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text>Register</Text>
          </TouchableOpacity>

          <Text>Or</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button2}>
            <Image
              style={styles.logo2}
              source={require("../../assets/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3}>
            <Image
              style={styles.logo2}
              source={require("../../assets/f.png")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default loginScreen;
