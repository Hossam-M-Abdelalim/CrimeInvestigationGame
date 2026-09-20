import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { auth } from "../../config/firebase";
import { getUserName, joinRoomByCode } from "../../services/roomService";

export default function JoinRoomScreen({ navigation }) {
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = async () => {
    try {
      if (!auth.currentUser) {
        Alert.alert("Error", "No logged in user found.");
        return;
      }

      if (!roomCode.trim()) {
        Alert.alert("Missing Code", "Please enter a room code.");
        return;
      }

      const userId = auth.currentUser.uid;
      const userName = await getUserName(userId);

      const room = await joinRoomByCode(roomCode.trim(), userId, userName);

      navigation.navigate("RoomLobby", {
        roomId: room.roomId,
        roomCode: room.roomCode,
      });
    } catch (error) {
      Alert.alert("Join Failed", error.message);
      console.log("Join room error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Investigation Room</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Room Code"
        placeholderTextColor="#777"
        value={roomCode}
        onChangeText={setRoomCode}
        autoCapitalize="characters"
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
        <Text style={styles.buttonText}>Join Room</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.back}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
    width: 260,
    textAlign: "center",
    letterSpacing: 4,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#b11226",
    padding: 15,
    borderRadius: 10,
    width: 260,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  back: {
    color: "#777",
    marginTop: 25,
  },
});