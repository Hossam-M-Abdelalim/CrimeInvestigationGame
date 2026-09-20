import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function RoomLobbyScreen({ route, navigation }) {
  const { roomId, roomCode } = route.params;

  const [players, setPlayers] = useState([]);
  const [maxPlayers, setMaxPlayers] = useState(6);

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);

    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const roomData = snapshot.data();
        setPlayers(roomData.players || []);
        setMaxPlayers(roomData.maxPlayers || 6);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const renderPlayer = ({ item, index }) => {
    const isHost = item.role === "host";

    return (
      <View style={styles.playerRow}>
        <Text style={styles.playerNumber}>{index + 1}</Text>

        <Text style={styles.playerName}>
          {isHost ? "👑 " : "🕵️ "}
          Detective {item.name}
        </Text>

        {isHost && <Text style={styles.hostTag}>HOST</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Lobby</Text>

      <Text style={styles.label}>Room Code</Text>
      <Text style={styles.code}>{roomCode}</Text>

      <Text style={styles.playersCount}>
        Players: {players.length} / {maxPlayers}
      </Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.uid}
        renderItem={renderPlayer}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Text style={styles.waiting}>Waiting for detectives...</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Investigation</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
  },
  code: {
    color: "#b11226",
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 4,
    marginBottom: 15,
  },
  playersCount: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 15,
  },
  list: {
    width: "100%",
    maxWidth: 420,
    maxHeight: 260,
    marginBottom: 20,
  },
  listContent: {
    gap: 10,
  },
  playerRow: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  playerNumber: {
    color: "#777",
    width: 30,
  },
  playerName: {
    color: "#fff",
    flex: 1,
    fontWeight: "bold",
  },
  hostTag: {
    color: "#b11226",
    fontSize: 12,
    fontWeight: "bold",
  },
  waiting: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#b11226",
    padding: 15,
    borderRadius: 10,
    width: 260,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  back: {
    color: "#777",
  },
});