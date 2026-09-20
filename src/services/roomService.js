import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

const MAX_PLAYERS = 6;

export const getUserName = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    if (data.name && data.name.trim()) {
      return data.name.trim();
    }

    if (data.email && data.email.trim()) {
      return data.email.trim().split("@")[0];
    }
  }

  return "Unknown Detective";
};

export const createRoom = async (roomCode, hostId, hostName) => {
  const safeHostName =
    hostName && hostName.trim() ? hostName.trim() : "Unknown Detective";

  return await addDoc(collection(db, "rooms"), {
    roomCode: roomCode,
    hostId: hostId,
    status: "lobby",
    maxPlayers: MAX_PLAYERS,
    players: [
      {
        uid: hostId,
        name: safeHostName,
        role: "host",
      },
    ],
    createdAt: serverTimestamp(),
  });
};

export const joinRoomByCode = async (roomCode, userId, userName) => {
  const safeUserName =
    userName && userName.trim() ? userName.trim() : "Unknown Detective";

  const roomsRef = collection(db, "rooms");

  const q = query(
    roomsRef,
    where("roomCode", "==", roomCode.toUpperCase()),
    where("status", "==", "lobby")
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Room not found or already started.");
  }

  const roomDoc = querySnapshot.docs[0];
  const roomData = roomDoc.data();

  const players = roomData.players || [];

  const alreadyJoined = players.some((player) => player.uid === userId);

  if (alreadyJoined) {
    return {
      roomId: roomDoc.id,
      roomCode: roomData.roomCode,
    };
  }

  if (players.length >= MAX_PLAYERS) {
    throw new Error("Room is full. Maximum 6 players allowed.");
  }

  const updatedPlayers = [
    ...players,
    {
      uid: userId,
      name: safeUserName,
      role: "player",
    },
  ];

  await updateDoc(doc(db, "rooms", roomDoc.id), {
    players: updatedPlayers,
  });

  return {
    roomId: roomDoc.id,
    roomCode: roomData.roomCode,
  };
};