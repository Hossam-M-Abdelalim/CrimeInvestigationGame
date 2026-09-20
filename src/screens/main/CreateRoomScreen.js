import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { auth } from "../../config/firebase";
import { createRoom } from "../../services/roomService";
import generateRoomCode from "../../utils/generateRoomCode";

export default function CreateRoomScreen({ navigation }) {
    const handleCreateRoom = async () => {
        try {
            if (!auth.currentUser) {
                Alert.alert("Error", "No logged in user found.");
                return;
            }

            const roomCode = generateRoomCode();

            const roomRef = await createRoom(roomCode, auth.currentUser.uid);

            navigation.navigate("RoomLobby", {
                roomId: roomRef.id,
                roomCode: roomCode,
            });
        } catch (error) {
            Alert.alert("Error", error.message);
            console.log("Create room error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Investigation Room</Text>

            <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
                <Text style={styles.buttonText}>Generate Room</Text>
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
    button: {
        backgroundColor: "#b11226",
        padding: 15,
        borderRadius: 10,
        width: 250,
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