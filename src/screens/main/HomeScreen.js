import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Detective</Text>
      <Text style={styles.subtitle}>Your investigation begins here.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateRoom")}
      >
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.navigate("JoinRoom")}
      >
        <Text style={styles.buttonOutlineText}>Join Room</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#b11226",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonOutline: {
    borderColor: "#b11226",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  buttonOutlineText: {
    color: "#b11226",
    textAlign: "center",
    fontWeight: "bold",
  },
  logout: {
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
});